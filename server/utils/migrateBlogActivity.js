/**
 * Migration script to update blogs with the new activity structure
 *
 * This script adds the daily, weekly, and monthly read tracking to existing blogs
 */

import mongoose from "mongoose";
import Blog from "../Schema/Blog.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import fs from "fs";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
const envPath = join("./.env");

// Check if the .env file exists
if (fs.existsSync(envPath)) {
  console.log(`Loading .env file from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.error(`.env file not found at ${envPath}`);
  process.exit(1);
}

// Verify DB_LOCATION is defined
if (!process.env.DB_LOCATION) {
  console.error("DB_LOCATION is not defined in the .env file.");
  console.error(
    "Please make sure your .env file contains: DB_LOCATION=mongodb://..."
  );
  process.exit(1);
}

// Format date as YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Format week as YYYY-WW
const formatWeek = (date) => {
  const d = new Date(date);
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (d - firstDayOfYear) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return `${d.getFullYear()}-${weekNum.toString().padStart(2, "0")}`;
};

// Format month as YYYY-MM
const formatMonth = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

const runMigration = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(
      `Using DB_LOCATION: ${process.env.DB_LOCATION.replace(
        /\/\/([^:]+):[^@]+@/,
        "//***:***@"
      )}`
    ); // Log the connection string with password hidden

    await mongoose.connect(process.env.DB_LOCATION, {
      autoIndex: true,
      serverSelectionTimeoutMS: 50000,
    });
    console.log("Connected to MongoDB");

    // Get all blogs
    const blogs = await Blog.find();
    console.log(`Found ${blogs.length} blogs to update`);

    let updatedCount = 0;
    const today = new Date();
    const formattedDate = formatDate(today);
    const formattedWeek = formatWeek(today);
    const formattedMonth = formatMonth(today);

    // Process each blog
    for (const blog of blogs) {
      try {
        let hasChanges = false;

        // Initialize activity object if it doesn't exist
        if (!blog.activity) {
          blog.activity = {
            total_reads: 0,
            total_likes: 0,
            total_comments: 0,
          };
          hasChanges = true;
        }

        // Add missing fields to activity
        if (blog.activity.total_likes === undefined) {
          blog.activity.total_likes = 0;
          hasChanges = true;
        }

        if (blog.activity.total_comments === undefined) {
          blog.activity.total_comments = 0;
          hasChanges = true;
        }

        // Add daily reads tracking (Map) if it doesn't exist
        if (!blog.activity.daily_reads) {
          // Add today's reads as the total reads to get started
          const dailyReadsMap = new Map();
          dailyReadsMap.set(formattedDate, blog.activity.total_reads || 0);
          blog.activity.daily_reads = dailyReadsMap;
          hasChanges = true;
        }

        // Add weekly reads tracking if it doesn't exist
        if (!blog.activity.weekly_reads) {
          const weeklyReadsMap = new Map();
          weeklyReadsMap.set(formattedWeek, blog.activity.total_reads || 0);
          blog.activity.weekly_reads = weeklyReadsMap;
          hasChanges = true;
        }

        // Add monthly reads tracking if it doesn't exist
        if (!blog.activity.monthly_reads) {
          const monthlyReadsMap = new Map();
          monthlyReadsMap.set(formattedMonth, blog.activity.total_reads || 0);
          blog.activity.monthly_reads = monthlyReadsMap;
          hasChanges = true;
        }

        // Add last_updated field if it doesn't exist
        if (!blog.activity.last_updated) {
          blog.activity.last_updated = today;
          hasChanges = true;
        }

        // Save if changes were made
        if (hasChanges) {
          await blog.save();
          updatedCount++;

          // Log progress every 10 blogs
          if (updatedCount % 10 === 0) {
            console.log(`Updated ${updatedCount} blogs so far...`);
          }
        }
      } catch (error) {
        console.error(`Error updating blog ${blog._id}:`, error);
      }
    }

    console.log(`Migration completed. Updated ${updatedCount} blogs.`);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the migration
runMigration();

