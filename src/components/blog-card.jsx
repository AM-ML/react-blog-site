import "../css/components/blog-card.css";
import { Link, useNavigate } from "react-router-dom";
import { TitleCase } from "../common/string";
import { formatDate } from "../common/functions";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../Router";
import axios from "axios";
import toast from "react-hot-toast";
import ScrollRevealWrapper from "../common/ScrollRevealWrapper";

const BlogCard = ({ blog, addBorder = true, onDelete, index = 0 }) => {
  const navigate = useNavigate();
  const { userAuth } = useContext(UserContext);

  let {
    blog_id,
    banner,
    title,
    description,
    publishedAt,
    tags,
    draft = false,
    author: {
      personal_info: { name = "", username, profile_img },
    },
  } = blog;

  // Determine the link based on draft status
  const blogLink = draft
    ? `/dashboard/writer/write/${blog_id}`
    : `/blog/${blog_id}`;

  // Function to handle delete
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.access_token}`,
      },
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog",
        { blog_id },
        config
      )
      .then(() => {
        toast.success("Blog deleted successfully!");
        // Call the onDelete callback if provided
        if (typeof onDelete === "function") {
          onDelete(blog_id);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting blog. Please try again later.");
      });
  };

  // Calculate delay based on index for staggered animation
  const delay = Math.min(index * 100, 500);

  return (
    <ScrollRevealWrapper animation="fade" delay={delay}>
      <div className={`bgcd-outer-container ${!addBorder && "no-border"}`}>
        <Link to={blogLink} className="bgcd-container-container">
          <div className="bgcd-container me-2">
            <div className="bgcd-header">
              <img
                src={profile_img}
                width={30}
                alt=""
                className="bgcd-author-image"
              />
              <Link
                to={"/author/" + username}
                className="bgcd-author-name text-clamp"
                onClick={(e) => e.stopPropagation()}
              >
                {TitleCase(name)}
              </Link>
              <p className="bgcd-header-date">@ {formatDate(publishedAt)}</p>
              {draft && <span className="bgcd-draft-badge">Draft</span>}
            </div>
            <h1 className="bgcd-title line-clamp-3">{TitleCase(title, false)}</h1>
            <p className="bgcd-description sm-hidden md-mdxl-hidden line-clamp-2">
              {description || "No description available"}
            </p>

            <div className="bgcd-tags">
              {tags && tags.length > 0 ? (
                tags.map((tag, i) => {
                  if (i > 1) return null;
                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: 0.05 * i }}
                    >
                      <span className="bgcd-tag btn rounded-pill">
                        {TitleCase(tag)}
                      </span>
                    </AnimationWrapper>
                  );
                })
              ) : (
                <span className="bgcd-tag btn rounded-pill">No tags</span>
              )}
            </div>
          </div>

          <div className="bgcd-banner-container aspect-square">
            <img src={banner} className="bgcd-banner" alt="Blog banner" />
          </div>
        </Link>

        {username === userAuth.username && (
          <div className="bgcd-actions">
            <button
              className="bgcd-delete-btn"
              onClick={handleDelete}
              title="Delete Blog"
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        )}
      </div>
    </ScrollRevealWrapper>
  );
};

export default BlogCard;
