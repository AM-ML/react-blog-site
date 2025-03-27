import "../css/components/blog-card.css";
import { Link } from "react-router-dom";
import { TitleCase } from "../common/string";
import { formatDate } from "../common/functions";
import AnimationWrapper from "../common/page-animation";

const BlogCard = ({ blog, addBorder = true }) => {
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

  return (
    <Link
      to={blogLink}
      className={`bgcd-container-container ${!addBorder && "no-border"}`}
    >
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
  );
};

export default BlogCard;
