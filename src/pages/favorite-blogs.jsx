import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { UserContext } from "../Router";
import axios from "axios";
import { TitleCase } from "../common/string";
import AnimationWrapper from "../common/page-animation";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../css/pages/favorite-blogs.css";

const FavoriteBlogs = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize config object
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${userAuth?.access_token}`,
    },
  }), [userAuth?.access_token]);

  const fetchFavoriteBlogs = useCallback(async () => {
    try {
      setLoading(true);
      if (userAuth?.favorite_blogs?.length > 0) {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/get-favorite-blogs",
          { ids: userAuth.favorite_blogs },
          config
        );
        setFavoriteBlogs(data.blogs);
      } else {
        setFavoriteBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching favorite blogs:", err);
      toast.error("Failed to fetch favorite blogs");
      setFavoriteBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [userAuth?.favorite_blogs, config]);

  const removeFromFavorites = useCallback(async (blogId) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/toggle-favorite",
        { blogId, userId: userAuth.id },
        config
      );

      setUserAuth(prev => ({
        ...prev,
        favorite_blogs: data.favorite_blogs,
      }));

      setFavoriteBlogs(prev => prev.filter(blog => blog._id !== blogId));
      toast.success("Removed from favorites");
    } catch (err) {
      console.error("Error removing blog from favorites:", err);
      toast.error("Error updating favorites");
    }
  }, [userAuth.id, config, setUserAuth]);

  useEffect(() => {
    if (userAuth?.id) {
      fetchFavoriteBlogs();
    }
  }, [userAuth?.id, fetchFavoriteBlogs]);

  // Memoize blog cards
  const blogCards = useMemo(() => 
    favoriteBlogs.map((blog, i) => (
      <AnimationWrapper key={blog._id} isListItem={true} index={i}>
        <div className="fb-blog-card">
          <Link to={`/blog/${blog.blog_id}`} className="fb-blog-link">
            <img
              src={blog.banner}
              alt={blog.title}
              className="fb-blog-banner"
              loading="lazy"
            />
            <div className="fb-blog-content">
              <h2 className="fb-blog-title">{TitleCase(blog.title)}</h2>
              <p className="fb-blog-date">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
          <button
            className="fb-remove-btn"
            onClick={() => removeFromFavorites(blog._id)}
            title="Remove from favorites"
          >
            <i className="bx bx-trash"></i>
          </button>
        </div>
      </AnimationWrapper>
    )),
    [favoriteBlogs, removeFromFavorites]
  );

  if (loading) {
    return (
      <div className="fb-loading">
        <div className="fb-loading-spinner"></div>
        <p>Loading favorite blogs...</p>
      </div>
    );
  }

  return (
    <AnimationWrapper>
      <div className="fb-container">
        <h1 className="fb-title">Favorite Blogs</h1>
        
        {favoriteBlogs.length > 0 ? (
          <div className="fb-blogs-grid">
            {blogCards}
          </div>
        ) : (
          <div className="fb-no-data">
            <p>No favorite blogs yet.</p>
            <Link to="/" className="fb-explore-link">
              Explore Blogs
            </Link>
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default FavoriteBlogs; 