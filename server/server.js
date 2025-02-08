import express from "express";
import NodeCache from "node-cache";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import cors from "cors";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import { v2 as cloudinary } from "cloudinary";

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJ_ID,
  private_key_id: process.env.FIREBASE_PK_ID,
  private_key: process.env.FIREBASE_PK.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CE,
  client_id: process.env.FIREBASE_CI,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_APCU,
  client_x509_cert_url: process.env.FIREBASE_CCU,
};

// schema
import User from "./Schema/User.js";
import Blog from "./Schema/Blog.js";

const server = express();
const port = 3000;

cloudinary.config({
  secure: true,
  cloud_name: "dlhedrwu6",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET, // Click 'View Credentials' below to copy your API secret
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Regex for email and password
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

// Middleware to enable JSON data sharing between request and response
server.use(express.json({ limit: "25mb" }));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // If cookies are used

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
const corsOptions = {
  origin: "*", // Allow all origins (or specify your front-end URL)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  while (await User.exists({ "personal_info.username": username })) {
    username += nanoid().substring(0, 5);
  }

  return username;
};

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );

  return {
    id: user._id,
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    name: user.personal_info.name,
    social_links: user.social_links,
    interests: user.interests,
    favorite_blogs: user.favorite_blogs,
    is_author: user.isAuthor,
    fullUser: user,
  };
};

const generateUploadURL = () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}`;
  return imageName;
};
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(403).json({ error: "Request not authorized" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }

    // Retrieve user from the database
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }

      if (!user.isAuthor) {
        return res
          .status(403)
          .json({ error: "Account does not have author privileges" });
      }

      req.user = user._id; // Set the user ID to request object
      next();
    } catch (dbErr) {
      return res
        .status(500)
        .json({ error: "Database error: " + dbErr.message });
    }
  });
};

// Signup route
server.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  // Data validation process
  if (name.length < 5) {
    return res
      .status(403)
      .json({ error: "Full name must be at least 5 letters long." });
  }

  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid Email" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be 6 to 20 characters with a numeric and 1 lowercase letter.",
    });
  }

  // Storing process
  try {
    const hashed_pwd = await bcrypt.hash(password, 10); // Encrypting pwd
    const username = await generateUsername(email); // Creating username

    const user = new User({
      // Creating user object from mongoose userSchema imported from User.js
      personal_info: {
        name,
        email,
        password: hashed_pwd,
        username,
      },
    });

    const savedUser = await user.save(); // Storing user object
    return res.status(200).json(formatDataToSend(savedUser));
  } catch (err) {
    if (err.code === 11000) {
      // 11000: unique object duplicated error
      return res.status(500).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: err.message });
  }
});

// Signin route
server.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "personal_info.email": email });

    if (!user) {
      return res.status(403).json({ error: "Email not found" });
    }

    if (user.google_auth) {
      return res.status(403).json({
        error: "This is a Google account, please continue with Google instead.",
      });
    }

    const match = await bcrypt.compare(password, user.personal_info.password);
    if (!match) {
      return res.status(403).json({ error: "Password is incorrect" });
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// Google authentication route
server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  try {
    const decoded_token = await getAuth().verifyIdToken(access_token);
    let { email, name } = decoded_token;

    let user = await User.findOne({ "personal_info.email": email }).select(
      "personal_info.name personal_info.username personal_info.profile_img google_auth"
    );

    if (user) {
      // Login
      if (!user.google_auth) {
        // If not Google account
        return res.status(403).json({
          error: "Account already exists, please use email & password instead.",
        });
      }
    } else {
      // Sign up
      const username = await generateUsername(email);
      user = new User({
        personal_info: {
          name,
          email,
          username,
        },
        google_auth: true,
      });

      await user.save();
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Google Authentication failed, please try with another account.",
    });
  }
});

// Upload banner
const uploadBanner = async (base64) => {
  const opts = {
    public_id: generateUploadURL(),
    overwrite: true,
    invalidate: true,
    resource_type: "image",
    format: "jpeg",
    quality: "auto",
    tags: ["banner"],
  };

  try {
    const result = await cloudinary.uploader.upload(base64, opts);
    return result.url; // Return the URL directly
  } catch (err) {
    throw err; // Throw the error to be handled in the calling function
  }
};

// Upload image
const uploadImage = async (base64, is_profile_img = false) => {
  if (!is_profile_img) {
    const opts = {
      public_id: generateUploadURL(),
      overwrite: true,
      invalidate: true,
      resource_type: "image",
      format: "jpeg",
      quality: "auto",
      tags: ["blog-image", "image"],
    };

    try {
      const result = await cloudinary.uploader.upload(base64, opts);
      return result.url; // Return the URL directly
    } catch (err) {
      throw err; // Throw the error to be handled in the calling function
    }
  } else {
    const opts = {
      public_id: generateUploadURL(),
      overwrite: true,
      invalidate: true,
      resource_type: "image",
      format: "jpeg",
      quality: "auto",
      transformation: [
        {
          width: 200,
          height: 200,
          crop: "thumb",
          gravity: "north",
        },
      ],
      tags: ["blog-image", "image"],
    };

    try {
      const result = await cloudinary.uploader.upload(base64, opts);
      return result.url; // Return the URL directly
    } catch (err) {
      throw err; // Throw the error to be handled in the calling function
    }
  }
};

// Upload banner route
server.post("/uploadBanner", async (req, res) => {
  const { base64 } = req.body;
  try {
    const url = await uploadBanner(base64);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Upload image route
server.post("/uploadImage", async (req, res) => {
  const { base64, is_profile_img = false } = req.body;
  try {
    const url = await uploadImage(base64, is_profile_img);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

server.post("/get-author", async (req, res) => {
  let { username } = req.body;

  let author = await User.findOne({ "personal_info.username": username });
  if (!author) return res.status(403).json({ error: "account not found" });
  if (!author.isAuthor)
    return res.status(403).json({ error: "account is not an author" });
  else {
    // return res.status(200).json({...formatDataToSend(author), blogs: author.blogs});
    let blogs = author.blogs.filter((blog) => blog.draft != true);
    return res.status(200).json({
      id: author._id,
      total_posts: author.account_info.total_posts,
      blogs: blogs,
      is_author: author.isAuthor,
      name: author.personal_info.name,
      username: author.personal_info.username,
      profile_img: author.personal_info.profile_img,
      email: author.personal_info.email,
      bio: author.personal_info.bio,
      joinedAt: author.joinedAt,
      social_links: {
        instagram: author.social_links.instagram,
        facebook: author.social_links.facebook,
        twitter: author.social_links.twitter,
        linkedin: author.social_links.linkedin,
      },
    });
  }
});

server.post("/get-blog", (req, res) => {
  const {
    blog_id,
    draft = false,
    mode = "view",
    incrementVal = mode != "edit" ? 1 : 0,
  } = req.body;

  Blog.findOneAndUpdate(
    { blog_id },
    { $inc: { "activity.total_reads": incrementVal } }
  )
    .populate(
      "author",
      "personal_info.name personal_info.username personal_info.profile_img"
    )
    .select(
      "title description content banner activity publishedAt blog_id tags"
    )
    .then((blog) => {
      User.findOneAndUpdate(
        { "personal_info.username": blog.author.username },
        { $inc: { "account_info.total_reads": incrementVal } }
      ).catch((err) => {
        return res.status(500).json({ error: err.message });
      });

      if (blog.draft && !draft) {
        return res.status(500).json({ error: "you cannot access draft blogs" });
      }

      return res.status(200).json({ blog });
    })
    .catch((err) => {
      console.log("error 500: /get-blog");
      return res.status(500).json({ error: err.message });
    });
});

server.post("/make-author", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isAuthor: true } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User is now an author", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

server.post("/latest-blogs", (req, res) => {
  const { page } = req.body;
  let maxLimit = 10;

  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.name -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title description banner activity tags publishedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/latest-blogs-counter", (req, res) => {
  Blog.countDocuments({ draft: false })
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

server.post("/search-blogs", async (req, res) => {
  const {
    limit = null,
    tags = [],
    date = null,
    page = 1,
    query = null,
    author_id = null,
  } = req.body;
  let maxLimit = limit ? limit : 10;

  // Create a base query object
  let searchQuery = { draft: false };

  // Add date filter if provided
  if (date) {
    const dateFilter = new Date(date);
    searchQuery.publishedAt = { $gte: dateFilter };
  }

  // Add tags filter if provided
  if (tags.length > 0) {
    searchQuery.tags = { $in: tags.map((tag) => tag.toLowerCase()) };
  }

  // Add search query filter if provided
  if (query) {
    searchQuery.$or = [
      { title: { $regex: query, $options: "i" } }, // case-insensitive search in title
      { description: { $regex: query, $options: "i" } }, // case-insensitive search in description
      { tags: { $regex: query, $options: "i" } },
    ];
  }

  // Add author filter if provided
  if (author_id) {
    console.log("Filtering by author_id:", author_id);
    searchQuery.author = author_id; // Ensure this is the correct field
  }

  console.log("\n\nNew Request: ", searchQuery);
  console.log("vars: ", tags, date, page, query, author_id);

  try {
    const blogs = await Blog.find(searchQuery)
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.name -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title description banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit);

    const totalDocs = await Blog.countDocuments(searchQuery);
    console.log("data, length:", totalDocs);
    return res.status(200).json({ blogs, totalDocs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

server.post("/search-authors", async (req, res) => {
  const { query = null, page = 1 } = req.body;
  let maxLimit = 50;

  // Create a base query object
  let searchQuery = { isAuthor: true }; // Only search for users who are authors

  // Add search query filter if provided
  if (query) {
    if (query.startsWith("@")) {
      // Search only by username if query starts with "@"
      searchQuery["personal_info.username"] = {
        $regex: query.slice(1),
        $options: "i",
      };
    } else {
      searchQuery.$or = [
        { "personal_info.name": { $regex: query, $options: "i" } }, // case-insensitive search in name
        { "personal_info.username": { $regex: query, $options: "i" } }, // case-insensitive search in username
      ];
    }
  }

  console.log("\n\nNew Request: ", searchQuery);
  console.log("vars: ", query, page);

  try {
    const authors = await User.find(searchQuery)
      .select(
        "personal_info.name personal_info.username personal_info.profile_img"
      )
      .skip((page - 1) * maxLimit)
      .limit(maxLimit);

    const formattedAuthors = authors.map((author) => ({
      name: author.personal_info.name,
      username: author.personal_info.username,
      profile_img: author.personal_info.profile_img,
    }));

    const totalDocs = await User.countDocuments(searchQuery);
    console.log("data, length:", totalDocs);

    return res.status(200).json({ authors: formattedAuthors, totalDocs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Create a cache instance (in-memory caching)
const trendingBlogsCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

server.post("/trending-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.name -_id"
      )
      .sort({ "activity.total_reads": -1 })
      .limit(10)
      .select(
        "blog_id title description banner activity tags publishedAt -_id"
      );

    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update account route
server.post("/update-account", verifyJWT, async (req, res) => {
  const {
    id: userId,
    personal_info,
    social_links,
    account_info,
    favorite_blogs,
    interests,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create an object to hold updates
    const updates = {};

    // Only add properties to updates if they are provided
    if (personal_info)
      updates.personal_info = { ...user.personal_info, ...personal_info };
    if (social_links)
      updates.social_links = { ...user.social_links, ...social_links };
    if (account_info)
      updates.account_info = { ...user.account_info, ...account_info };
    if (favorite_blogs) updates.favorite_blogs = favorite_blogs; // Assuming this is a direct replace
    if (interests) updates.interests = interests; // Assuming this is a direct replace

    // Update the user document
    Object.assign(user, updates);

    // Save the updated user data
    const updatedUser = await user.save();

    return res.status(200).json(formatDataToSend(updatedUser));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

server.post("/new-blog", verifyJWT, (req, res) => {
  let authorId = req.user;

  let { title, description, banner, tags, content, draft, id = "" } = req.body;

  if (!title.length) {
    return res.status(403).json({ error: "no title provided" });
  }
  if (!draft) {
    if (description.length > 200 || !description.length) {
      return res
        .status(403)
        .json({ error: "must provide description under 200 characters" });
    }
    if (banner[0] == "/" || !banner.length) {
      return res.status(403).json({ error: "no banner provided" });
    }
    if (!tags.length || tags.length > 10) {
      return res
        .status(403)
        .json({ error: "must provide tags with maximum of 10 tags" });
    }
    if (!content.blocks.length) {
      return res.status(403).json({ error: "blog lacks a body" });
    }
  }

  tags = tags.map((tag) => tag.toLowerCase());

  let blogId =
    id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  if (id) {
    Blog.findOneAndUpdate(
      { blog_id: blogId },
      {
        title,
        description,
        banner,
        content,
        tags,
        draft: draft ? draft : false,
      }
    )
      .then((blog) => {
        return res.status(200).json({ id: blogId });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } else {
    let blog = new Blog({
      title,
      description,
      content,
      tags,
      banner,
      author: authorId,
      blog_id: blogId,
      draft: Boolean(draft),
    });

    blog
      .save()
      .then((blog) => {
        let incrementVal = draft ? 0 : 1;
        User.findOneAndUpdate(
          { _id: authorId },
          {
            $inc: { "account_info.total_posts": incrementVal },
            $push: { blogs: blog._id },
          }
        )
          .then((user) => {
            return res.status(200).json({ id: blog.blog_id });
          })
          .catch((err) => {
            return res
              .status(500)
              .json({ error: "Failed to increment total_posts" });
          });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  }
});

server.get("/", (req, res) => res.send("Express on Vercel"));

// Start server
server.listen(port, "0.0.0.0", () => {
  console.log("Listening on port " + port);
});

export default server;
