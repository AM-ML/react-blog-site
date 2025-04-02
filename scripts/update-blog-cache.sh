#!/bin/bash

# Navigate to the project directory
cd /home/user/blog

# Run the cache update script
node src/services/cache-latest-blogs.js

# Log the update
echo "Blog cache updated at $(date)" >> /home/user/blog/logs/cache-updates.log 