import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  personal_info: {
    name: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [5, 'fullname must be 5 letters long'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: String,
    username: {
      type: String,
      minlength: [3, 'Username must be 3 letters long'],
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [200, 'Bio should not be more than 200'],
      default: "",
    },
    profile_img: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
  },
  social_links: {
    youtube: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    }
  },
  account_info: {
    total_posts: {
      type: Number,
      default: 0
    },
    total_reads: {
      type: Number,
      default: 0
    },
  },
  google_auth: {
    type: Boolean,
    default: false
  },
  isAuthor: {
    type: Boolean,
    default: false
  },
  blogs: {
    type: [Schema.Types.ObjectId],
    ref: 'blogs',
    default: [],
  },
  favorite_blogs: {
    type: [Schema.Types.ObjectId],
    ref: 'blogs',
    default: [],
  },
  interests: {
    type: [String]
  }

},
  {
    timestamps: {
      createdAt: 'joinedAt'
    }

  })

export default mongoose.model("users", userSchema);
