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

const server = express();
let port = 3000;

cloudinary.config({ 
  secure: true,
  cloud_name: 'dlhedrwu6', 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/; // regex for password

// use middleware to enable json data sharing between request and response
server.use(express.json({ limit: "25mb" }));

server.use(cors());
server.use(express.urlencoded({ limit: "25mb" }));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

// connected to mongoDB project database 
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000 // increase timeout to 50 seconds
});

const generateUsername = async (email) => {
  let username = email.split('@')[0];

  let usernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result);

  // nanoid(): random unique id / number
  return usernameNotUnique ? username += nanoid().substring(0, 5) : username;
}

const formatDataToSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
  
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    name: user.personal_info.name
  }
}

const generateUploadURL = () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}`;

  return imageName;
}
// if post request to /signup
server.post("/signup", (req, res) => {
  let { name, email, password } = req.body;

  /* data validation process */

  // full name
  if (name.length < 5) {
    // 403: invalidation code
    return res.status(403).json({ "error": "Full name must be atleast 5 letters long." });
  }

  //email
  if (!email.length) {
    return res.status(403).json({ "error": "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ "error": "Invalid Email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({ "error": "Password must be 6 to 20 characters with a numeric and 1 lowercase letter " })
  }

  /* storing process */
  //.hash(pwd, iterations, callback function)
  bcrypt.hash(password, 10, async (err, hashed_pwd) => { // encrypting pwd
    let username = await generateUsername(email); // creating username

    let user = new User({ // creating user object from mongoose userSchema imported from User.js
      personal_info: {
        name,
        email,
        password: hashed_pwd,
        username
      }
    });

    user.save().then((u) => { // storing user object and returning the mongoDB user object
      return res.status(200).json(formatDataToSend(u));
    })
      .catch(err => {
        if (err.code == 11000) { // 11000: unique object duplicated error
          return res.status(500).json({ "error": "Email already exists" });
        }

        return res.status(500).json({ "error": err.message });
      })
  })
})

server.post("/signin", (req, res) => {
  const {email, password} = req.body;

  User.findOne({ "personal_info.email": email })
  .then((user) => {
    if(!user) {
      return res.status(403).json({"error": "Email not found"});
    }
    if(user.google_auth) {
      return res.status(403).json({ "error": "this is a google account, please continue with google instead" })
    }
    bcrypt.compare(password, user.personal_info.password, (err, result) => {
      if (err) {
        return res.status(403).json({"error": "error occured while login, please try again"})
      } if (!result) {
        return res.status(403).json({"error": "password is incorrect"});
      }

      return res.status(200).json(formatDataToSend(user));
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({"error": err.message});
  })
})

server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  getAuth()
  .verifyIdToken(access_token)
  .then(async (decoded_token) => {
    let { email, name } = decoded_token;

    let user = await User.findOne({ "personal_info.email": email }).select("personal_info.name personal_info.username personal_info.profile_img google_auth")
    .then ((u) => {
      return u || null;
    })
    .catch((err) => {
      return res.status(500).json({ "error": err.message });
    })

    if(user) { // login
      if(!user.google_auth) { // if not google_account
        return res.status(403).json({ "error": "account already exists, please use email & password instead." });
      }
    } else { // sign up
      let username = await generateUsername(email);

      user = new User({
        personal_info: {
          name,
          email,
          username,
        },
        google_auth: true
      })

      await user.save().then((u) => {
        user = u;
      })
      .catch((err) => {
        return res.status(500).json({ "error": err.message });
      });

      return res.status(200).json(formatDataToSend(user)); // use our own access_token
    }
  })
  .catch((err) => {
    return res.status(500).json({ "error": "Google Authentication failed, please try with another account" });
  })
})

const uploadImage = async (base64) => {
  const opts = {
    public_id: generateUploadURL(),
    overwrite: true,
    invalidate: true,
    resource_type: "image",
    format: "jpeg",
    quality: "auto",
    tags: ["banners"]
  };
  
  try {
    const result = await cloudinary.uploader
    .upload(base64, opts);
    return result.url; // Return the URL directly
  } catch (err) {
    throw err; // Throw the error to be handled in the calling function
  }
}

server.post("/uploadBanner", async (req, res) => {
  const { base64 } = req.body;
  try {
    const url = await uploadImage(base64);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


server.listen(port, () => {
  console.log("listening on port " + port);
})    