import axios from "axios";
import "../css/components/blog-component.css";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import Loading from "../common/loading";
import AnimationWrapper from "../common/page-animation";
import { TitleCase } from "../common/string";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../common/functions";
import BlogCard from "./blog-card";
import LoadMoreBtn from "../common/load-more";
import toast, { Toaster } from "react-hot-toast";
import ContentBlock from "../common/content-block";
import { UserContext } from "../Router";
import Preloader from "../common/preloader";

const BlogComponent = ({ blogId }) => {
  const {
    userAuth,
    userAuth: { username, access_token, id, favorite_blogs = [] },
    setUserAuth,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [relatedBlogsLoading, setRelatedBlogsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Destructure blog data with default values
  const {
    _id,
    tags = [],
    title = "",
    banner = "",
    content = "",
    description = "",
    publishedAt = "",
    author: {
      personal_info: {
        name = "",
        username: author_username = "",
        profile_img = "",
      } = {},
    } = {},
  } = blog;

  // Memoize API calls
  const getRelatedBlogsData = useCallback(
    async ({ tags = [], blogId = "" }) => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",
          {
            tags,
            limit: 5,
          }
        );
        data.blogs = data.blogs.filter((dBlog) => dBlog.blog_id != blogId);
        setRelatedBlogs({
          results: data.blogs,
          totalDocs: data.totalDocs - 1,
          page: 1,
        });
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      } finally {
        setRelatedBlogsLoading(false);
      }
    },
    []
  );

  const getBlogData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/get-blog",
        {
          blog_id: blogId,
        }
      );
      setBlog(data.blog);
      await getRelatedBlogsData({
        tags: data.blog.tags,
        blogId: data.blog.blog_id,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setLoading(false);
    }
  }, [blogId, getRelatedBlogsData]);

  useEffect(() => {
    getBlogData();
  }, [getBlogData]);

  useEffect(() => {
    if (_id && favorite_blogs) {
      setIsFavorite(favorite_blogs.includes(_id));
    }
  }, [_id, favorite_blogs]);

  const loadMoreRelatedBlogs = useCallback(async () => {
    setFetchLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",
        {
          tags,
          limit: 5,
          page: relatedBlogs.page + 1,
        }
      );
      data.blogs = data.blogs.filter((dBlog) => dBlog.blog_id != blogId);
      setRelatedBlogs((prev) => ({
        results: [...prev.results, ...data.blogs],
        totalDocs: data.totalDocs - 1,
        page: prev.page + 1,
      }));
    } catch (err) {
      console.error("Error loading more blogs:", err);
    } finally {
      setFetchLoading(false);
    }
  }, [tags, blogId, relatedBlogs.page]);

  const copyLink = useCallback(() => {
    navigator.clipboard
      .writeText("https://boffoconsulting.net/blog/" + blogId)
      .then(() => toast.success("Copied Blog Link!"))
      .catch((err) => toast.error("Error While Copying Blog Link: " + err));
  }, [blogId]);

  const toggleFavorite = useCallback(async () => {
    if (!access_token) {
      toast.error("Please login to favorite blogs");
      navigate("/signin");
      return;
    }

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/toggle-favorite",
        { blogId: _id, userId: id },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      toast.success(
        data.favorited ? "Added to favorites!" : "Removed from favorites"
      );
      setIsFavorite(data.favorited);

      setUserAuth((prev) => ({
        ...prev,
        favorite_blogs: data.favorite_blogs,
      }));
    } catch (err) {
      console.error("Toggle favorite error:", err);
      toast.error("Error updating favorites");
    }
  }, [access_token, _id, id, navigate, setUserAuth]);

  const deleteBlog = useCallback(async () => {
    if (!access_token) {
      toast.error("You need to be logged in to delete this blog");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog",
        { blog_id: blogId },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      toast.success("Blog deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Error deleting blog. Please try again later.");
    }
  }, [access_token, blogId, navigate]);

  // Memoize content blocks
  const contentBlocks = useMemo(
    () =>
      blog.content?.[0]?.blocks?.map((block, i) => (
        <div className="bbc-ctb-wrapper">
          <ContentBlock block={block} />
        </div>
      )) || [],
    [blog.content]
  );

  // Memoize related blogs
  const relatedBlogsList = useMemo(
    () =>
      relatedBlogs.results?.map((rBlog, i) => (
        <AnimationWrapper key={i} isListItem={true} index={i}>
          <BlogCard
            addBorder={i + 1 !== relatedBlogs.results.length}
            blog={rBlog}
          />
        </AnimationWrapper>
      )) || [],
    [relatedBlogs.results]
  );

  return (
    <>
      {loading && <Preloader />}
      <AnimationWrapper>
        <div className="bbc-container">
          <div className="bbc-title-container">
            <h2 className="bbc-title">{TitleCase(title, false)}</h2>
          </div>

          <div className="bbc-fb">
            <div className="bbc-author d-none">
              <img
                src={profile_img}
                alt=""
                className="bbc-author-img"
                loading="lazy"
              />
              <div className="bbc-author-text">
                {TitleCase(name)}
                <Link
                  to={"/author/" + author_username}
                  className="bbc-author-username"
                >
                  @{author_username}
                </Link>
              </div>
            </div>

            <div className="bbc-fb-end mt-5 ms-auto">
              <i
                role="button"
                onClick={toggleFavorite}
                className={`bx ${
                  isFavorite ? "bxs-star" : "bx-star"
                } bbc-star me-5`}
                style={{
                  color: isFavorite ? "#FFD700" : "inherit",
                  marginRight: "15px",
                }}
              ></i>
              <i
                role="button"
                onClick={copyLink}
                className="bx bxs-share-alt"
              ></i>
              <p className="bbc-date">Published On {formatDate(publishedAt)}</p>
            </div>
          </div>

          {username === author_username && (
            <div className="bbc-user-actions d-flex flex-row flex-stretch">
              <Link
                className="bbc-ua-edit mb-2 btn btn-primary btn-lg d-inline-block px-5 w-max flex-grow"
                to={`/dashboard/writer/write/${blogId}`}
              >
                Edit Blog
              </Link>
              <button
                className="bbc-ua-delete mb-2 btn btn-danger btn-lg d-inline-block px-5 w-max"
                onClick={deleteBlog}
              >
                Delete Blog
              </button>
            </div>
          )}

          <div className="bbc-bc aspect-video shadow">
            <img src={banner} alt="" className="bbc-bc-img" loading="lazy" />
          </div>

          <div className="bbc-ctbs-container">{contentBlocks}</div>
        </div>

        <div className="bbc-rb-container">
          {relatedBlogsLoading ? (
            <div className="w-100 d-flex justify-content-center">
              <Loading height="30vh" />
            </div>
          ) : !relatedBlogs.results.length ? (
            <div className="bbc-rb-no-data">
              <h1 className="bbc-rb-section-title">Related Blogs</h1>
              <h1 className="bbc-rb-no-data-text text-dark text-bold">
                No Blogs Found.
              </h1>
            </div>
          ) : (
            <>
              <h1 className="bbc-rb-section-title">Related Blogs</h1>
              <div className="bbc-rb-blogs">{relatedBlogsList}</div>
              {relatedBlogs &&
                !fetchLoading &&
                relatedBlogs.results.length &&
                relatedBlogs.results.length < relatedBlogs.totalDocs && (
                  <LoadMoreBtn onClick={loadMoreRelatedBlogs} />
                )}
              {fetchLoading && (
                <div className="w-100 d-flex justify-content-center">
                  <Loading height="30vh" />
                </div>
              )}
            </>
          )}
        </div>
      </AnimationWrapper>
    </>
  );
};

export default BlogComponent;
