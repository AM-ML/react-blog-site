import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { SERVER_DOMAIN } from './config.js';

const CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'home-component-blogs-data.json');

const fetchLatestBlogs = async () => {
  try {
    const { data } = await axios.post(SERVER_DOMAIN + "/search-blogs", {
      limit: 3,
      page: 1,
      sort: { publishedAt: -1 }
    });

    // Ensure the data directory exists
    const dataDir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the cache file
    fs.writeFileSync(CACHE_FILE, JSON.stringify({
      blogs: data.blogs,
      lastUpdated: new Date().toISOString()
    }, null, 2));

    console.log('Latest blogs cache updated successfully');
  } catch (error) {
    console.error('Error updating latest blogs cache:', error);
  }
};

// Run the fetch function
fetchLatestBlogs(); 