import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema({

  blog_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    maxlength: 200,
    // required: true
  },
  content: {
    type: [],
    // required: true
  },
  tags: {
    type: [String],
    // required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  activity: {
    total_reads: {
      type: Number,
      default: 0
    },
    total_likes: {
      type: Number,
      default: 0
    },
    total_comments: {
      type: Number,
      default: 0
    },
    // Daily view tracking - stores last 90 days of view data
    // Format: { "YYYY-MM-DD": count }
    daily_reads: {
      type: Map,
      of: Number,
      default: () => new Map()
    },
    // Last 12 weeks of weekly aggregated view data 
    // Format: { "YYYY-WW": count }
    weekly_reads: {
      type: Map,
      of: Number,
      default: () => new Map()
    },
    // Last 12 months of monthly aggregated view data
    // Format: { "YYYY-MM": count }
    monthly_reads: {
      type: Map,
      of: Number,
      default: () => new Map()
    },
    // Last updated timestamp to track when the activity data was last modified
    last_updated: {
      type: Date,
      default: Date.now
    }
  },
  draft: {
    type: Boolean,
    default: false
  }

},
  {
    timestamps: {
      createdAt: 'publishedAt'
    }

  })

export default mongoose.model("blogs", blogSchema);
