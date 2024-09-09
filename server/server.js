import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import cors from "cors";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import { v2 as cloudinary } from "cloudinary";
import serviceAccount from './firebase.json' assert { type: 'json' };

// schema
import User from "./Schema/User.js";
import Blog from "./Schema/Blog.js";

const server = express();
const port = 3000;

cloudinary.config({
  secure: true,
  cloud_name: 'dlhedrwu6',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Regex for email and password
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

// Middleware to enable JSON data sharing between request and response
server.use(express.json({ limit: "25mb" }));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Update as needed
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
const corsOptions = {
  origin: '*', // Allow all origins (or specify your front-end URL)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials
  allowedHeaders: 'Content-Type, Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

server.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000 // Increase timeout to 50 seconds
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const generateUsername = async (email) => {
  let username = email.split('@')[0];

  while (await User.exists({ "personal_info.username": username })) {
    username += nanoid().substring(0, 5);
  }

  return username;
}

const formatDataToSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

  return {
    id: user._id,
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    name: user.personal_info.name,
    is_author: user.isAuthor
  }
}

const generateUploadURL = () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}`;
  return imageName;
}
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(403).json({ "error": "Request not authorized" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ "error": "Invalid access token" });
    }

    // Retrieve user from the database
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return res.status(403).json({ "error": "User not found" });
      }

      if (!user.isAuthor) {
        return res.status(403).json({ "error": "Account does not have author privileges" });
      }

      req.user = user._id; // Set the user ID to request object
      next();
    } catch (dbErr) {
      return res.status(500).json({ "error": "Database error: " + dbErr.message });
    }
  });
}


// Signup route
server.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  // Data validation process
  if (name.length < 5) {
    return res.status(403).json({ "error": "Full name must be at least 5 letters long." });
  }

  if (!email.length) {
    return res.status(403).json({ "error": "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ "error": "Invalid Email" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({ "error": "Password must be 6 to 20 characters with a numeric and 1 lowercase letter." });
  }

  // Storing process
  try {
    const hashed_pwd = await bcrypt.hash(password, 10); // Encrypting pwd
    const username = await generateUsername(email); // Creating username

    const user = new User({ // Creating user object from mongoose userSchema imported from User.js
      personal_info: {
        name,
        email,
        password: hashed_pwd,
        username
      }
    });

    const savedUser = await user.save(); // Storing user object
    return res.status(200).json(formatDataToSend(savedUser));
  } catch (err) {
    if (err.code === 11000) { // 11000: unique object duplicated error
      return res.status(500).json({ "error": "Email already exists" });
    }
    return res.status(500).json({ "error": err.message });
  }
});

// Signin route
server.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "personal_info.email": email });

    if (!user) {
      return res.status(403).json({ "error": "Email not found" });
    }

    if (user.google_auth) {
      return res.status(403).json({ "error": "This is a Google account, please continue with Google instead." });
    }

    const match = await bcrypt.compare(password, user.personal_info.password);
    if (!match) {
      return res.status(403).json({ "error": "Password is incorrect" });
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "error": err.message });
  }
});

// Google authentication route
server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  try {
    const decoded_token = await getAuth().verifyIdToken(access_token);
    let { email, name } = decoded_token;

    let user = await User.findOne({ "personal_info.email": email }).select("personal_info.name personal_info.username personal_info.profile_img google_auth");

    if (user) { // Login
      if (!user.google_auth) { // If not Google account
        return res.status(403).json({ "error": "Account already exists, please use email & password instead." });
      }
    } else { // Sign up
      const username = await generateUsername(email);
      user = new User({
        personal_info: {
          name,
          email,
          username,
        },
        google_auth: true
      });

      await user.save();
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "error": "Google Authentication failed, please try with another account." });
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
    tags: ["banner"]
  };

  try {
    const result = await cloudinary.uploader.upload(base64, opts);
    return result.url; // Return the URL directly
  } catch (err) {
    throw err; // Throw the error to be handled in the calling function
  }
}

// Upload image
const uploadImage = async (base64) => {
  const opts = {
    public_id: generateUploadURL(),
    overwrite: true,
    invalidate: true,
    resource_type: "image",
    format: "jpeg",
    quality: "auto",
    tags: ["blog-image", "image"]
  };

  try {
    const result = await cloudinary.uploader.upload(base64, opts);
    return result.url; // Return the URL directly
  } catch (err) {
    throw err; // Throw the error to be handled in the calling function
  }
}

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
  const { base64 } = req.body;
  try {
    const url = await uploadImage(base64);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

server.post("/get-author", async (req, res) => {
  let { id } = req.body;

  let author = await User.findOne({"_id": id});
  if (!author.isAuthor) return res.status(403).json({"error": "account is not an author"});
  else {
    return res.status(200).json({...formatDataToSend(author), blogs: author.blogs});
  }
})

server.post("/make-author", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isAuthor: true } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ "error": "User not found" });
    }

    return res.status(200).json({ message: "User is now an author", user });
  } catch (err) {
    return res.status(500).json({ "error": err.message });
  }
});

server.get("/latest-blogs", (req, res) => {
  let maxLimit = 5;

  Blog.find({ draft: false })
  .populate("author", "personal_info.profile_img personal_info.username personal_info.name -_id")
  .sort({ "publishedAt": -1 })
  .select("blog_id title description banner activity tags publishedAt -_id")
  .limit(maxLimit)
  .then((blogs) => {
    return res.status(200).json({ blogs });
  })
  .catch((err) => {
    return res.status(500).json({ "error": err.message });
  });
});

server.get("/trending-blogs", async (req, res) => {
  const maxLimit = 10;
  let blogs = [];
  let monthCounter = 0; // Tracks how many months back we're fetching from

  try {
    while (blogs.length < maxLimit) {
      // Get the current date and subtract 'monthCounter' months
      let dateFrom = new Date();
      dateFrom.setMonth(dateFrom.getMonth() - monthCounter);

      // Get the start and end of the month for this iteration
      let startOfMonth = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 1);
      let endOfMonth = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);

      // Find blogs published within this month, sorted by total_reads
      const monthlyBlogs = await Blog.find({
        draft: false,
        publishedAt: { $gte: startOfMonth, $lte: endOfMonth }
      })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.name -_id")
        .sort({ "activity.total_reads": -1 })
        .select("blog_id title description banner activity tags publishedAt -_id")
        .limit(maxLimit - blogs.length); // Fetch only the remaining number of blogs

      // Add the fetched blogs to the main list
      blogs = blogs.concat(monthlyBlogs);

      // If there are no more blogs to fetch from previous months, break
      if (monthlyBlogs.length === 0) {
        break;
      }

      monthCounter++; // Move to the previous month
    }

    // Return the accumulated blogs
    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
server.post("/new-blog", verifyJWT,(req, res) => {
  let authorId  = req.user;

  let { title, description, banner, tags, content, draft } = req.body;

  if (!title.length) {
    return res.status(403).json({"error": "no title provided"});
  }
  if(!draft) {
    if (description.length > 200 || !description.length) {
      return res.status(403).json({"error": "must provide description under 200 characters"});
    }
    if (banner[0] == "/" || !banner.length) {
      return res.status(403).json({"error": "no banner provided"});
    }
    if (!tags.length || tags.length > 10) {
      return res.status(403).json({"error": "must provide tags with maximum of 10 tags"});
    }
    if (!content.blocks.length) {
      return res.status(403).json({"error": "blog lacks a body"});
    }
  }

  tags = tags.map(tag => tag.toLowerCase());

  let blogId = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid();

  let blog = new Blog({
    title, description, content, tags, banner,
    author: authorId,
    blog_id: blogId,
    draft: Boolean(draft)
  });

  blog.save().then(blog => {
    let incrementVal = draft? 0 : 1;
    User.findOneAndUpdate({ _id: authorId }, {
      $inc: { "account_info.total_posts": incrementVal },
      $push: { "blogs": blog._id }
    })
    .then(user => {
      return res.status(200).json({ id: blog.blog_id });
    })
    .catch (err => {
      return res.status(500).json({ "error": "Failed to increment total_posts" });
    })
  })
  .catch((err) => {
    return res.status(500).json({ "error": err.message });
  });
});

// Start server
server.listen(port, () => {
  console.log("Listening on port " + port);
});
