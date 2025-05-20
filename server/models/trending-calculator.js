/**
 * Calculates trending scores and filters blogs based on the specified time period
 */

// Get date range for specified period
const getDateRangeForPeriod = (period) => {
  const now = new Date();
  let startDate = new Date();
  
  switch(period) {
    case 'today':
      // Start of today
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      // 7 days ago
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      // 30 days ago
      startDate.setDate(now.getDate() - 30);
      break;
    default:
      // Default to 7 days if period is invalid
      startDate.setDate(now.getDate() - 7);
  }
  
  return { startDate, endDate: now };
};

// Calculate trending score for blogs within a specific time period
const calculateTrendingScore = (blog, period) => {
  // Check if blog exists and has the required properties
  if (!blog) {
    return 0;
  }
  
  // Ensure blog has activity property or provide defaults
  if (!blog.activity || typeof blog.activity !== 'object') {
    blog.activity = { total_reads: 0, total_likes: 0, total_comments: 0 };
  }
  
  // Ensure all required activity properties exist
  const reads = blog.activity.total_reads || 0;
  const likes = blog.activity.total_likes || 0;
  const comments = blog.activity.total_comments || 0;
  
  const { startDate } = getDateRangeForPeriod(period);
  
  // Handle missing or invalid publishedAt date
  let publishDate;
  try {
    publishDate = blog.publishedAt ? new Date(blog.publishedAt) : new Date();
    // Check if publishDate is valid
    if (isNaN(publishDate.getTime())) {
      publishDate = new Date();
    }
  } catch (e) {
    publishDate = new Date();
  }
  
  // Calculate base score from activity
  let score = reads;
  
  // Add likes and comments to the score with appropriate weighting
  score += likes * 2; // Likes are worth 2x reads
  score += comments * 3; // Comments are worth 3x reads
  
  // Apply time decay factor - newer posts get a boost
  const ageInDays = Math.max(0, (Date.now() - publishDate) / (1000 * 60 * 60 * 24));
  const recencyBoost = Math.max(0, 1 - (ageInDays / 30)); // Max boost for newest posts
  
  // Apply recency boost to score
  score = score * (1 + recencyBoost);
  
  // If blog is published before the start date, reduce its score
  if (publishDate < startDate) {
    // Apply penalty for older blogs, but still consider their recent activity
    const dateDiff = Math.max(0, (startDate - publishDate) / (1000 * 60 * 60 * 24));
    const agePenalty = Math.min(0.9, dateDiff / 100); // Max 90% penalty
    score = score * (1 - agePenalty);
  }
  
  return Math.max(0, score); // Ensure score is never negative
};

// Filter blogs and sort by trending score
const getTrendingBlogs = (blogs, period, limit = 10) => {
  // Validate input parameters
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return [];
  }

  // Ensure period is valid
  const validPeriods = ['today', 'week', 'month'];
  const validPeriod = validPeriods.includes(period) ? period : 'week';
  
  try {
    // Calculate trending score for each blog
    const scoredBlogs = blogs.map(blog => {
      try {
        return {
          blog,
          score: calculateTrendingScore(blog, validPeriod)
        };
      } catch (err) {
        console.error("Error calculating score for blog:", err);
        return { blog, score: 0 };
      }
    });
    
    // Sort by score (descending)
    scoredBlogs.sort((a, b) => b.score - a.score);
    
    // Return the top blogs
    return scoredBlogs.slice(0, limit).map(item => item.blog);
  } catch (err) {
    console.error("Error in getTrendingBlogs:", err);
    return [];
  }
};

// Export as ES modules
export { getDateRangeForPeriod, calculateTrendingScore, getTrendingBlogs }; 