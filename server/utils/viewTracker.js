/**
 * Blog View Tracking Utility
 *
 * Manages recording views and calculating trending blogs based on time periods
 */

import Blog from "../Schema/Blog.js";

// Format date as YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Format week as YYYY-WW (year and week number)
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

/**
 * Record a view for a blog and update all time-based tracking data
 *
 * @param {string} blogId - The blog's _id
 * @returns {Promise} - Resolution indicates success
 */
export const recordView = async (blogId) => {
  try {
    const today = new Date();
    const formattedDate = formatDate(today);
    const formattedWeek = formatWeek(today);
    const formattedMonth = formatMonth(today);

    // Fetch the blog
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    // Initialize activity structure if needed
    if (!blog.activity) {
      blog.activity = {
        total_reads: 0,
        total_likes: 0,
        total_comments: 0,
        daily_reads: new Map(),
        weekly_reads: new Map(),
        monthly_reads: new Map(),
        last_updated: new Date(),
      };
    }

    // Initialize Maps if they don't exist
    if (!blog.activity.daily_reads) blog.activity.daily_reads = new Map();
    if (!blog.activity.weekly_reads) blog.activity.weekly_reads = new Map();
    if (!blog.activity.monthly_reads) blog.activity.monthly_reads = new Map();

    // Increment total reads
    blog.activity.total_reads = (blog.activity.total_reads || 0) + 1;

    // Update daily reads
    const dailyReads =
      blog.activity.daily_reads instanceof Map
        ? blog.activity.daily_reads
        : new Map();
    dailyReads.set(formattedDate, (dailyReads.get(formattedDate) || 0) + 1);
    blog.activity.daily_reads = dailyReads;

    // Update weekly reads
    const weeklyReads =
      blog.activity.weekly_reads instanceof Map
        ? blog.activity.weekly_reads
        : new Map();
    weeklyReads.set(formattedWeek, (weeklyReads.get(formattedWeek) || 0) + 1);
    blog.activity.weekly_reads = weeklyReads;

    // Update monthly reads
    const monthlyReads =
      blog.activity.monthly_reads instanceof Map
        ? blog.activity.monthly_reads
        : new Map();
    monthlyReads.set(
      formattedMonth,
      (monthlyReads.get(formattedMonth) || 0) + 1
    );
    blog.activity.monthly_reads = monthlyReads;

    // Update last_updated timestamp
    blog.activity.last_updated = today;

    // Clean up old data (keep only last 90 days, 12 weeks, 12 months)
    pruneOldViewData(blog);

    // Save the blog
    await blog.save();

    return true;
  } catch (error) {
    console.error("Error recording view:", error);
    // Still return true to not affect the user experience
    return true;
  }
};

/**
 * Remove old tracking data to keep the database size manageable
 *
 * @param {Object} blog - Blog document to clean up
 */
const pruneOldViewData = (blog) => {
  try {
    const today = new Date();

    // Keep last 90 days of daily data
    const dailyReads = blog.activity.daily_reads;
    if (dailyReads instanceof Map && dailyReads.size > 0) {
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - 90);
      const cutoffDateStr = formatDate(cutoffDate);

      // Get all keys (dates) and sort them
      const dates = Array.from(dailyReads.keys()).sort();

      // Remove dates older than the cutoff
      dates.forEach((date) => {
        if (date < cutoffDateStr) {
          dailyReads.delete(date);
        }
      });
    }

    // Keep last 12 weeks of weekly data
    const weeklyReads = blog.activity.weekly_reads;
    if (weeklyReads instanceof Map && weeklyReads.size > 0) {
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - 12 * 7);
      const cutoffWeek = formatWeek(cutoffDate);

      // Get all keys (weeks) and sort them
      const weeks = Array.from(weeklyReads.keys()).sort();

      // Remove weeks older than the cutoff
      weeks.forEach((week) => {
        if (week < cutoffWeek) {
          weeklyReads.delete(week);
        }
      });
    }

    // Keep last 12 months of monthly data
    const monthlyReads = blog.activity.monthly_reads;
    if (monthlyReads instanceof Map && monthlyReads.size > 0) {
      const cutoffDate = new Date(today);
      cutoffDate.setMonth(today.getMonth() - 12);
      const cutoffMonth = formatMonth(cutoffDate);

      // Get all keys (months) and sort them
      const months = Array.from(monthlyReads.keys()).sort();

      // Remove months older than the cutoff
      months.forEach((month) => {
        if (month < cutoffMonth) {
          monthlyReads.delete(month);
        }
      });
    }
  } catch (error) {
    console.error("Error pruning old view data:", error);
    // Don't throw to prevent affecting the view recording
  }
};

/**
 * Get trending blogs for a specific time period
 *
 * @param {string} period - 'today', 'week', or 'month'
 * @param {number} limit - Maximum number of blogs to return
 * @returns {Promise<Array>} - Array of trending blogs
 */
export const getTrendingBlogs = async (period = "week", limit = 10) => {
  try {
    const today = new Date();
    const formattedDate = formatDate(today);
    const formattedWeek = formatWeek(today);
    const formattedMonth = formatMonth(today);

    // Get all blogs (not drafts)
    const blogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.name -_id"
      )
      .select("blog_id title description banner activity tags publishedAt -_id")
      .lean();

    if (!blogs || blogs.length === 0) {
      return [];
    }

    // Calculate trend scores based on period
    const scoredBlogs = blogs.map((blog) => {
      let score = 0;

      if (!blog.activity) {
        return { blog, score: 0 };
      }

      // Initialize if needed
      if (!blog.activity.daily_reads) blog.activity.daily_reads = {};
      if (!blog.activity.weekly_reads) blog.activity.weekly_reads = {};
      if (!blog.activity.monthly_reads) blog.activity.monthly_reads = {};

      try {
        switch (period) {
          case "today":
            // Get today's reads
            score = blog.activity.daily_reads[formattedDate] || 0;
            break;

          case "week":
            // Sum all daily reads from the past 7 days
            for (let i = 0; i < 7; i++) {
              const date = new Date(today);
              date.setDate(today.getDate() - i);
              const dateStr = formatDate(date);
              score += blog.activity.daily_reads[dateStr] || 0;
            }
            // Alternative: use weekly reads
            // score = blog.activity.weekly_reads[formattedWeek] || 0;
            break;

          case "month":
            // Sum all daily reads from the past 30 days
            for (let i = 0; i < 30; i++) {
              const date = new Date(today);
              date.setDate(today.getDate() - i);
              const dateStr = formatDate(date);
              score += blog.activity.daily_reads[dateStr] || 0;
            }
            // Alternative: use monthly reads
            // score = blog.activity.monthly_reads[formattedMonth] || 0;
            break;

          default:
            // Default to weekly trending
            for (let i = 0; i < 7; i++) {
              const date = new Date(today);
              date.setDate(today.getDate() - i);
              const dateStr = formatDate(date);
              score += blog.activity.daily_reads[dateStr] || 0;
            }
        }

        // Add a small weight for overall popularity
        score += Math.log(blog.activity.total_reads || 1) * 0.1;

        // Add weights for likes and comments
        const likes = blog.activity.total_likes || 0;
        const comments = blog.activity.total_comments || 0;
        score += likes * 2;
        score += comments * 3;

        return { blog, score };
      } catch (err) {
        console.error("Error calculating trend score:", err);
        return { blog, score: 0 };
      }
    });

    // Sort by score (descending)
    scoredBlogs.sort((a, b) => b.score - a.score);

    // Return the top blogs
    return scoredBlogs.slice(0, limit).map((item) => item.blog);
  } catch (error) {
    console.error("Error getting trending blogs:", error);
    return [];
  }
};

export default {
  recordView,
  getTrendingBlogs,
};

