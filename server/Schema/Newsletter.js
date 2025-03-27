import mongoose, { Schema } from "mongoose";

// Schema for newsletter subscribers
const subscriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Schema for sent newsletters
const newsletterSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sentBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  recipientCount: {
    type: Number,
    default: 0
  }
});

export const Subscriber = mongoose.model("subscribers", subscriberSchema);
export const Newsletter = mongoose.model("newsletters", newsletterSchema); 