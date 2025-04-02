import axios from "axios";
import "../css/components/blog-component.css";
import { useContext, useEffect, useState } from "react";
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

const BlogComponent = ({ blogId }) => {
  let {
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

  let {
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

  useEffect(() => {
    const getRelatedBlogsData = ({ tags = [], blogId = "" }) => {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
          tags,
          limit: 5,
        })
        .then(({ data }) => {
          data.blogs = data.blogs.filter((dBlog) => dBlog.blog_id != blogId);
          setRelatedBlogs({
            results: data.blogs,
            totalDocs: data.totalDocs - 1,
            page: 1,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setRelatedBlogsLoading(false);
        });
    };

    const getBlogData = () => {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
          blog_id: blogId,
        })
        .then(({ data }) => {
          setBlog(data.blog);
          getRelatedBlogsData({
            tags: data.blog.tags,
            blogId: data.blog.blog_id,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getBlogData();
  }, [blogId]);

  useEffect(() => {
    // Check if blog is in favorites
    if (_id && favorite_blogs) {
      setIsFavorite(favorite_blogs.includes(_id));
    }
  }, [_id, favorite_blogs]);

  const loadMoreRelatedBlogs = () => {
    setFetchLoading(true);

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tags,
        limit: 5,
        page: relatedBlogs.page + 1,
      })
      .then(({ data }) => {
        data.blogs = data.blogs.filter((dBlog) => dBlog.blog_id != blogId);
        setRelatedBlogs({
          results: [...relatedBlogs.results, ...data.blogs],
          totalDocs: data.totalDocs - 1,
          page: relatedBlogs.page + 1,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText("https://boffoconsulting.net/blog/" + blogId)
      .then(() => {
        toast.success("Copied Blog Link!");
      })
      .catch((err) => {
        toast.error("Error While Copying Blog Link: " + err);
      });
  };

  const toggleFavorite = () => {
    if (!access_token) {
      // Redirect to login if not authenticated
      toast.error("Please login to favorite blogs");
      navigate("/signin");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/toggle-favorite",
        { blogId: _id, userId: id },
        config
      )
      .then(({ data }) => {
        if (data.favorited) {
          toast.success("Added to favorites!");
        } else {
          toast.success("Removed from favorites");
        }
        setIsFavorite(data.favorited);
        
        // Update the userAuth context with the new favorites list
        setUserAuth((prev) => ({
          ...prev,
          favorite_blogs: data.favorite_blogs,
        }));
      })
      .catch((err) => {
        console.error("Toggle favorite error:", err);
        toast.error("Error updating favorites");
      });
  };

  const deleteBlog = () => {
    if (!access_token) {
      toast.error("You need to be logged in to delete this blog");
      return;
    }

    // Ask for confirmation
    if (!window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog",
        { blog_id: blogId },
        config
      )
      .then(() => {
        toast.success("Blog deleted successfully!");
        // Redirect to dashboard
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting blog. Please try again later.");
      });
  };

  return (
    <AnimationWrapper>
      <div className="bbc-container">
        <div className="bbc-title-container">
          <h2 className="bbc-title">{TitleCase(title, false)}</h2>
        </div>

        <div className="bbc-fb">
          <div className="bbc-author">
            <img src={profile_img} alt="" className="bbc-author-img" />
            <div className="bbc-author-text">
              {TitleCase(name)}
              <Link to={"/author/" + author_username} className="bbc-author-username">
                @{author_username}
              </Link>
            </div>
          </div>

          <div className="bbc-fb-end">
            <i
              role="button"
              onClick={toggleFavorite}
              className={`bx ${isFavorite ? "bxs-star" : "bx-star"} bbc-star`}
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
            <p className="bbc-date">
              Published On {formatDate(publishedAt)}
            </p>
          </div>
        </div>

        {username == author_username && (
          <div className="bbc-user-actions">
            <Link
              className="bbc-ua-edit mb-2 btn btn-danger btn-lg"
              to={`/dashboard/writer/write/${blogId}`}
            >
              Edit Blog
            </Link>
            <button
              className="bbc-ua-delete mb-2 btn btn-danger btn-lg"
              onClick={deleteBlog}
            >
              Delete Blog
            </button>
          </div>
        )}

        <div className="bbc-bc aspect-video shadow">
          <img src={banner} alt="" className="bbc-bc-img" />
        </div>

        <div className="bbc-ctbs-container">
          {blog.content[0].blocks.map((block, i) => {
            return (
              <AnimationWrapper key={i} isListItem={true} index={i}>
                <div className="bbc-ctb-wrapper">
                  <ContentBlock block={block} />
                </div>
              </AnimationWrapper>
            );
          })}
        </div>
      </div>

      <div className="bbc-rb-container">
        {relatedBlogsLoading || !relatedBlogs ? (
          <Loading height="30vh" />
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
            <div className="bbc-rb-blogs">
              {relatedBlogs.results.map((rBlog, i) => {
                return (
                  <AnimationWrapper
                    key={i}
                    isListItem={true}
                    index={i}
                  >
                    <BlogCard
                      addBorder={i + 1 != relatedBlogs.results.length}
                      blog={rBlog}
                    />
                  </AnimationWrapper>
                );
              })}
            </div>
            {relatedBlogs &&
              !fetchLoading &&
              relatedBlogs.results.length &&
              relatedBlogs.results.length < relatedBlogs.totalDocs && (
                <LoadMoreBtn onClick={loadMoreRelatedBlogs} />
              )}
            {fetchLoading && <Loading height="30vh" />}
          </>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default BlogComponent;
