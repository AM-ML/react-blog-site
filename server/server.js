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
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";

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
import { Newsletter, Subscriber } from "./Schema/Newsletter.js";

const server = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "mail.boffoconsulting.net",
  port: 465, // From your email settings (SMTP Port)
  secure: true, // Use SSL/TLS
  auth: {
    user: "alireda.programming@boffoconsulting.net",
    pass: "admin@power", // Use your real email password
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP server connection error:", error);
  } else {
    console.log("SMTP server connection established");
  }
});

cloudinary.config({
  secure: true,
  cloud_name: "dlhedrwu6",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Regex for email and password
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

// Security middleware
server.use(helmet()); // Set security HTTP headers
server.use(xss()); // Sanitize inputs against XSS
server.use(mongoSanitize()); // Sanitize against NoSQL query injection
server.use(express.json({ limit: "25mb" }));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});

// Apply rate limiting to auth routes
server.use("/signup", authLimiter);
server.use("/signin", authLimiter);
server.use("/google-auth", authLimiter);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));

// Connect to MongoDB with improved error handling
mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

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
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: "96h" } // Token expires in 24 hours
  );

  return {
    id: user._id,
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    name: user.personal_info.name,
    social_links: user.social_links,
    favorite_blogs: user.favorite_blogs,
    is_author: user.isAuthor,
    role: user.role,
    fullUser: user,
    google_auth: user.google_auth,
  };
};

const generateUploadURL = () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}`;
  return imageName;
};

// Improved JWT verification with try-catch
const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Request not authorized" });
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, async (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ error: "Token expired, please sign in again" });
        }
        return res.status(403).json({ error: "Invalid access token" });
      }

      try {
        const user = await User.findById(payload.id);

        if (!user) {
          return res.status(403).json({ error: "User not found" });
        }

        req.user = user._id;
        next();
      } catch (dbErr) {
        console.error("Database error in verifyJWT:", dbErr);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Verify if user is admin with improved error handling
const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Request not authorized" });
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, async (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ error: "Token expired, please sign in again" });
        }
        return res.status(403).json({ error: "Invalid access token" });
      }

      try {
        const user = await User.findById(payload.id);

        if (!user) {
          return res.status(403).json({ error: "User not found" });
        }

        if (user.role !== "admin" && user.role !== "owner") {
          return res.status(403).json({ error: "Admin access required" });
        }

        req.user = user._id;
        next();
      } catch (dbErr) {
        console.error("Database error in verifyAdmin:", dbErr);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Signup route with improved validation and error handling
server.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Data validation process
    if (name.length < 5) {
      return res
        .status(403)
        .json({ error: "Full name must be at least 5 letters long." });
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

    // Check if email already exists
    const existingUser = await User.findOne({ "personal_info.email": email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already exists" });
    }

    // Storing process
    const hashed_pwd = await bcrypt.hash(password, 12); // Increased salt rounds for better security
    const username = await generateUsername(email);

    const user = new User({
      personal_info: {
        name,
        email,
        password: hashed_pwd,
        username,
      },
    });

    const savedUser = await user.save();
    return res.status(200).json(formatDataToSend(savedUser));
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Signin route with improved security
server.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

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
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Google authentication route with improved error handling
server.post("/google-auth", async (req, res) => {
  try {
    let { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: "Access token is required" });
    }

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
    console.error("Google auth error:", err);
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
    format: "webp",
    quality: 65,
    tags: ["banner"],
  };

  try {
    const result = await cloudinary.uploader.upload(base64, opts);
    return result.url;
  } catch (err) {
    throw err;
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
      format: "webp",
      quality: 65,
      tags: ["blog-image", "image"],
    };

    try {
      const result = await cloudinary.uploader.upload(base64, opts);
      return result.url;
    } catch (err) {
      throw err;
    }
  } else {
    const opts = {
      public_id: generateUploadURL(),
      overwrite: true,
      invalidate: true,
      resource_type: "image",
      format: "webp",
      quality: 65,
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
      return result.url;
    } catch (err) {
      throw err;
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

server.post("/change-password", verifyJWT, (req, res) => {
  let { currentPassword, newPassword } = req.body;

  if (
    !passwordRegex.test(currentPassword) ||
    !passwordRegex.test(newPassword)
  ) {
    return res.status(403).json({
      error:
        "Password must be 6 to 20 characters with a numeric and 1 lowercase letter.",
    });
  }
  User.findOne({ _id: req.user })
    .then((user) => {
      if (user.google_auth) {
        return res
          .status(403)
          .json({ error: "You can't change your google account's password." });
      }
      bcrypt.compare(
        currentPassword,
        user.personal_info.password,
        (err, result) => {
          if (err) {
            return res.status(500).json({
              error:
                "Some error occurred while changing the password, please try again.",
            });
          }
          if (!result) {
            return res
              .status(403)
              .json({ error: "Incorrect current password" });
          }
          bcrypt.hash(newPassword, 10, (err, hashed_pwd) => {
            User.findOneAndUpdate(
              { _id: req.user },
              { "personal_info.password": hashed_pwd }
            )
              .then((u) => {
                return res.status(200).json({ status: "password changed" });
              })
              .catch((err) => {
                return res.status(500).json({
                  error:
                    "Error occurred while saving password, please try again later.",
                });
              });
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "User not found." });
    });
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
  try {
    let {
      query,
      tag,
      tags,
      date,
      page = 1,
      limit = 10,
      eliminate_blog,
      author,
      userId,
    } = req.body;

    let findQuery = { draft: false };

    if (query) {
      findQuery.$or = [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    if (tag) {
      findQuery.tags = { $in: [tag] };
    }

    if (tags && Array.isArray(tags) && tags.length) {
      findQuery.tags = { $in: tags };
    }

    if (date) {
      findQuery.publishedAt = { $gt: new Date(date) };
    }

    if (eliminate_blog) {
      findQuery.blog_id = { $ne: eliminate_blog };
    }

    if (author) {
      findQuery.author = author;
    }

    let sortCriteria = {};
    let userInterests = [];

    if (userId) {
      const user = await User.findById(userId);
      if (user && user.interests) {
        userInterests = user.interests;
      }
    }

    sortCriteria.publishedAt = -1;

    const blogs = await Blog.find(findQuery)
      .populate(
        "author",
        "personal_info.name personal_info.username personal_info.profile_img"
      )
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalDocs = await Blog.countDocuments(findQuery);

    if (userInterests.length > 0) {
      const scoredBlogs = blogs.map((blog) => {
        let score = 0;
        blog.tags.forEach((tag) => {
          if (userInterests.includes(tag)) {
            score += 1;
          }
        });
        return { blog, score };
      });

      scoredBlogs.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.blog.publishedAt) - new Date(a.blog.publishedAt);
      });

      const reorderedBlogs = scoredBlogs.map((item) => item.blog);

      return res.status(200).json({
        blogs: reorderedBlogs,
        totalDocs,
      });
    }

    return res.status(200).json({ blogs, totalDocs });
  } catch (err) {
    console.error("Search blogs error:", err);
    return res.status(500).json({ error: "Internal server error" });
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

server.post("/user-drafts", verifyJWT, async (req, res) => {
  const { page = 1 } = req.body;
  const authorId = req.user;
  let maxLimit = 10;

  try {
    const drafts = await Blog.find({ author: authorId, draft: true })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.name -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title description banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit);

    const totalDocs = await Blog.countDocuments({
      author: authorId,
      draft: true,
    });

    return res.status(200).json({ blogs: drafts, totalDocs });
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
    if (favorite_blogs) updates.favorite_blogs = favorite_blogs;

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

// ADMIN ROUTES

// Search users with filtering and pagination
server.post("/admin/users", verifyAdmin, async (req, res) => {
  try {
    const {
      query = "",
      role = "",
      page = 1,
      limit = 10,
      dateStart,
      dateEnd,
    } = req.body;

    if (page < 1 || limit < 1 || limit > 50) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    // Build search query
    let searchQuery = {};

    // Text search
    if (query) {
      searchQuery.$or = [
        { "personal_info.name": { $regex: query, $options: "i" } },
        { "personal_info.username": { $regex: query, $options: "i" } },
        { "personal_info.email": { $regex: query, $options: "i" } },
      ];
    }

    // Role filter
    if (role && role !== "all") {
      searchQuery.role = role;
    }

    // Date filter
    if (dateStart || dateEnd) {
      searchQuery.joinedAt = {};
      if (dateStart) {
        searchQuery.joinedAt.$gte = new Date(dateStart);
      }
      if (dateEnd) {
        searchQuery.joinedAt.$lte = new Date(dateEnd);
      }
    }

    // Execute query with pagination
    const users = await User.find(searchQuery)
      .select(
        "personal_info.name personal_info.username personal_info.email personal_info.profile_img role isAuthor joinedAt"
      )
      .sort({ joinedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Count total documents for pagination
    const totalDocs = await User.countDocuments(searchQuery);

    return res.status(200).json({
      users,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
    });
  } catch (err) {
    console.error("Search users error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update user role with improved validation and error handling
server.post("/admin/update-user-role", verifyAdmin, async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const adminId = req.user;

    if (!userId || !newRole) {
      return res
        .status(400)
        .json({ error: "User ID and new role are required" });
    }

    if (!["user", "author", "admin"].includes(newRole)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if admin is trying to set someone as owner
    if (newRole === "owner") {
      return res.status(403).json({ error: "Cannot assign owner role" });
    }

    // Get admin user to check if they're owner
    const adminUser = await User.findById(adminId);

    if (!adminUser) {
      return res.status(404).json({ error: "Admin user not found" });
    }

    // Only owner can create admins
    if (newRole === "admin" && adminUser.role !== "owner") {
      return res.status(403).json({ error: "Only owners can create admins" });
    }

    // Get user to update
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cannot demote owners
    if (userToUpdate.role === "owner") {
      return res.status(403).json({ error: "Cannot change role of owner" });
    }

    // Update user role
    const updates = { role: newRole };

    // Keep isAuthor in sync with role
    if (newRole === "author" || newRole === "admin" || newRole === "owner") {
      updates.isAuthor = true;
    } else {
      updates.isAuthor = false;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    return res.status(200).json({
      message: "User role updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.personal_info.username,
        name: updatedUser.personal_info.name,
        email: updatedUser.personal_info.email,
        role: updatedUser.role,
        isAuthor: updatedUser.isAuthor,
      },
    });
  } catch (err) {
    console.error("Update user role error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// NEWSLETTER ROUTES

// Subscribe to newsletter with improved validation
server.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({ error: "Email already subscribed" });
      } else {
        // Reactivate subscription
        existingSubscriber.active = true;
        await existingSubscriber.save();

        // Send welcome back email
        try {
          await transporter.sendMail({
            from: '"BOFFO Blog" <alireda.programming@boffoconsulting.net>',
            to: email,
            subject: "Welcome back to our newsletter!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Welcome Back to BOFFO Blog!</h2>
                <p>We're thrilled to have you back as a subscriber to our newsletter.</p>
                <p>You'll now start receiving our latest updates, news, and special offers.</p>
                <p>If you didn't request this subscription, you can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.</p>
                <p>Thank you for subscribing!</p>
                <hr>
                <p style="font-size: 12px; color: #666;">BOFFO Consulting Ltd.</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Error sending welcome back email:", emailErr);
          // Continue even if email fails
        }

        return res.status(200).json({ message: "Subscription reactivated" });
      }
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send welcome email
    try {
      await transporter.sendMail({
        from: '"BOFFO Blog" <alireda.programming@boffoconsulting.net>',
        to: email,
        subject: "Welcome to our newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Welcome to BOFFO Blog!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll now receive our latest updates, news, and special offers.</p>
            <p>If you didn't request this subscription, you can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.</p>
            <p>Thank you for subscribing!</p>
            <hr>
            <p style="font-size: 12px; color: #666;">BOFFO Consulting Ltd.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
      // Continue even if email fails
    }

    return res
      .status(200)
      .json({ message: "Successfully subscribed to newsletter" });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Unsubscribe from newsletter with improved validation
server.post("/newsletter/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ error: "Email not found in subscribers" });
    }

    subscriber.active = false;
    await subscriber.save();

    // Send unsubscribe confirmation email
    try {
      await transporter.sendMail({
        from: '"BOFFO Blog" <alireda.programming@boffoconsulting.net>',
        to: email,
        subject: "You've been unsubscribed from our newsletter",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Unsubscribe Confirmation</h2>
            <p>You have been successfully unsubscribed from the BOFFO Blog newsletter.</p>
            <p>We're sorry to see you go! If you'd like to subscribe again in the future, you can visit our website.</p>
            <p>Thank you for your interest in BOFFO Blog.</p>
            <hr>
            <p style="font-size: 12px; color: #666;">BOFFO Consulting Ltd.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Error sending unsubscribe email:", emailErr);
      // Continue even if email fails
    }

    return res.status(200).json({ message: "Successfully unsubscribed" });
  } catch (err) {
    console.error("Newsletter unsubscribe error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get all newsletter subscribers (admin only) with improved error handling
server.get("/admin/newsletter/subscribers", verifyAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ active: true }).sort({
      subscribedAt: -1,
    });

    return res.status(200).json({
      subscribers,
      totalSubscribers: subscribers.length,
    });
  } catch (err) {
    console.error("Get subscribers error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Send newsletter (admin only) with nodemailer implementation
server.post("/admin/newsletter/send", verifyAdmin, async (req, res) => {
  try {
    const { subject, content } = req.body;
    const adminId = req.user;

    if (!subject || !content) {
      return res
        .status(400)
        .json({ error: "Subject and content are required" });
    }

    // Get active subscribers
    const subscribers = await Subscriber.find({ active: true });

    if (subscribers.length === 0) {
      return res.status(400).json({ error: "No active subscribers" });
    }

    // Create newsletter record
    const newsletter = new Newsletter({
      subject,
      content,
      sentBy: adminId,
      recipientCount: subscribers.length,
    });

    await newsletter.save();

    // Format HTML content for email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>${subject}</h2>
        <div style="line-height: 1.6;">
          ${content.replace(/\n/g, "<br>")}
        </div>
        <hr>
        <p style="font-size: 12px; color: #666;">
          BOFFO Consulting Ltd.<br>
          <a href="[UNSUBSCRIBE_LINK]">Unsubscribe</a> from our newsletter.
        </p>
      </div>
    `;

    // Send emails in batches to avoid overloading the SMTP server
    const batchSize = 25;
    const batches = Math.ceil(subscribers.length / batchSize);
    let failedCount = 0;

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, subscribers.length);
      const batch = subscribers.slice(start, end);

      for (const subscriber of batch) {
        try {
          // Personalized unsubscribe link
          const personalizedHtml = htmlContent.replace(
            "[UNSUBSCRIBE_LINK]",
            `${
              process.env.FRONTEND_URL || "https://boffoconsulting.net"
            }/unsubscribe?email=${encodeURIComponent(subscriber.email)}`
          );

          await transporter.sendMail({
            from: '"BOFFO Blog" <alireda.programming@boffoconsulting.net>',
            to: subscriber.email,
            subject: subject,
            html: personalizedHtml,
          });
        } catch (emailErr) {
          console.error(`Error sending to ${subscriber.email}:`, emailErr);
          failedCount++;
          // Continue with next subscriber
        }
      }

      // Add a small delay between batches to prevent rate limiting
      if (i < batches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Update newsletter record with success/failure stats
    if (failedCount > 0) {
      newsletter.recipientCount = subscribers.length - failedCount;
      await newsletter.save();
    }

    return res.status(200).json({
      message: `Newsletter sent to ${
        subscribers.length - failedCount
      } subscribers${failedCount > 0 ? ` (${failedCount} failed)` : ""}`,
      recipientCount: subscribers.length - failedCount,
      failedCount,
      newsletter: {
        id: newsletter._id,
        subject: newsletter.subject,
        sentAt: newsletter.sentAt,
        recipientCount: newsletter.recipientCount,
      },
    });
  } catch (err) {
    console.error("Send newsletter error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get sent newsletters (admin only) with improved error handling
server.get("/admin/newsletter/history", verifyAdmin, async (req, res) => {
  try {
    const newsletters = await Newsletter.find()
      .sort({ sentAt: -1 })
      .populate("sentBy", "personal_info.name personal_info.username");

    return res.status(200).json({ newsletters });
  } catch (err) {
    console.error("Get newsletter history error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Toggle favorite blog
server.post("/toggle-favorite", verifyJWT, async (req, res) => {
  try {
    const { blogId, userId } = req.body;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if blog is already in favorites
    const isFavorited = user.favorite_blogs.includes(blogId);

    if (isFavorited) {
      // Remove from favorites
      user.favorite_blogs = user.favorite_blogs.filter(
        (id) => id.toString() !== blogId.toString()
      );
    } else {
      // Add to favorites
      user.favorite_blogs.push(blogId);
    }

    await user.save();

    // Return the updated user data
    return res.status(200).json({
      favorited: !isFavorited,
      message: isFavorited ? "Removed from favorites" : "Added to favorites",
      favorite_blogs: user.favorite_blogs,
    });
  } catch (err) {
    console.error("Toggle favorite error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get favorite blogs
server.post("/get-favorite-blogs", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(200).json({ blogs: [] });
    }

    const blogs = await Blog.find({ _id: { $in: ids } })
      .populate(
        "author",
        "personal_info.name personal_info.username personal_info.profile_img"
      )
      .select("title blog_id banner publishedAt")
      .sort({ publishedAt: -1 });

    return res.status(200).json({ blogs });
  } catch (err) {
    console.error("Get favorite blogs error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete blog endpoint
server.post("/delete-blog", verifyJWT, async (req, res) => {
  try {
    const { blog_id } = req.body;
    const userId = req.user;

    if (!blog_id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    // Find the blog
    const blog = await Blog.findOne({ blog_id });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the user is the author of the blog
    if (blog.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You don't have permission to delete this blog" });
    }

    // Delete the blog
    await Blog.deleteOne({ blog_id });

    // Update the user's total_posts count if the blog was published
    if (!blog.draft) {
      await User.findByIdAndUpdate(userId, {
        $inc: { "account_info.total_posts": -1 },
      });
    }

    // Remove the blog from user's blogs array
    await User.findByIdAndUpdate(userId, { $pull: { blogs: blog._id } });

    // Remove the blog from any user's favorite_blogs array
    await User.updateMany(
      { favorite_blogs: blog._id },
      { $pull: { favorite_blogs: blog._id } }
    );

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete blog error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add compression middleware
server.use(compression());

// Add a cache instance for user data
const userDataCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Add new endpoint for fetching optimized user data
server.post("/get-user-data", verifyJWT, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find user and select only necessary fields
    const user = await User.findById(id)
      .select(
        "personal_info.name personal_info.email personal_info.profile_img personal_info.username social_links favorite_blogs isAuthor role google_auth"
      )
      .lean(); // Use lean() for better performance

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Format the response with only necessary data
    const formattedData = {
      id: user._id,
      name: user.personal_info.name,
      email: user.personal_info.email,
      profile_img: user.personal_info.profile_img,
      username: user.personal_info.username,
      social_links: user.social_links,
      favorite_blogs: user.favorite_blogs || [],
      is_author: user.isAuthor,
      role: user.role,
      google_auth: user.google_auth,
      last_updated: new Date().toISOString(),
    };

    // Set cache control headers to prevent caching
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Content-Type": "application/json",
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Global error handler
server.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

server.get("/", (req, res) => res.send("Express on Vercel"));

// Start server
server.listen(port, "0.0.0.0", () => {
  console.log("Listening on port " + port);
});

export default server;
