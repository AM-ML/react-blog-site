import "../css/components/blog-card.css";
import { Link, useNavigate } from "react-router-dom";
import { TitleCase } from "../common/string";
import { formatDate } from "../common/functions";
import AnimationWrapper from "../common/page-animation";
import { useContext, useState } from "react";
import { UserContext } from "../Router";
import axios from "axios";
import toast from "react-hot-toast";
import ScrollRevealWrapper from "../common/ScrollRevealWrapper";

const BlogCard = ({ blog, addBorder = true, onDelete, index = 0 }) => {
  const navigate = useNavigate();
  const { userAuth } = useContext(UserContext);
  const [deleteStatus, setDeleteStatus] = useState("idle"); // idle, deleting, success, error
  const [isVisible, setIsVisible] = useState(true);

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
    
    if (deleteStatus !== "idle") return;
    
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setDeleteStatus("deleting");
      
      // Call the delete API
      axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/delete-blog`, {
        data: { blog_id },
        headers: {
          "Authorization": `Bearer ${userAuth.access_token}`
        }
      })
      .then(() => {
        setDeleteStatus("success");
        // Fade out animation
        setTimeout(() => {
          setIsVisible(false);
          // After fade-out, trigger the parent's onDelete if provided
          setTimeout(() => {
            if (onDelete) onDelete(blog_id);
          }, 300);
        }, 500);
        
        toast.success("Blog deleted successfully");
      })
      .catch(err => {
        console.error("Delete failed:", err);
        setDeleteStatus("error");
        toast.error("Failed to delete the blog. Please try again.");
        // Reset after some time
        setTimeout(() => setDeleteStatus("idle"), 3000);
      });
    }
  };

  // Calculate animation delay based on index
  const delay = {
    duration: 0.5,
    delay: 0.1 + (index * 0.1)
  };

  return (
    <ScrollRevealWrapper animation="fade" delay={delay}>
      <div 
        className={`bgcd-outer-container ${!addBorder && "no-border"} ${deleteStatus === "success" ? "delete-success" : ""} ${!isVisible ? "fade-out" : ""}`}
        style={{ 
          position: "relative",
        }}
      >
        {deleteStatus === "deleting" && (
          <div className="delete-overlay">
            <div className="delete-spinner"></div>
            <p>Deleting...</p>
          </div>
        )}
        {deleteStatus === "error" && (
          <div className="delete-overlay error">
            <i className="bx bx-error"></i>
            <p>Delete failed!</p>
          </div>
        )}
        
        <Link to={blogLink} className="bgcd-container-container">
          <div className="bgcd-container me-2">
            <div className="bgcd-header">
              <p className="bgcd-published-date">Published {formatDate(publishedAt)}</p>
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
              className={`bgcd-delete-btn ${deleteStatus !== "idle" ? "disabled" : ""}`}
              onClick={handleDelete}
              title="Delete Blog"
              disabled={deleteStatus !== "idle"}
            >
              <i className={`bx ${deleteStatus === "deleting" ? "bx-loader-alt bx-spin" : "bx-trash"}`}></i>
            </button>
          </div>
        )}
      </div>
    </ScrollRevealWrapper>
  );
};

export default BlogCard;
