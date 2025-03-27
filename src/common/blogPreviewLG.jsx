import { Link } from "react-router-dom";
import "../css/common/blogPreviewLG.css";
import { TitleCase } from "./string";

const BlogCard = ({ blog, aligned = "left" }) => {
  let {
    blog_id,
    banner,
    title,
    description,
    content,
    publishedAt,
    author: {
      personal_info: { name, username, profile_img },
    },
  } = blog;

  return (
    <div className="bpl-container shadow-sm my-3">
      <div
        className={`bpl-p1 ${
          aligned === "right" && window.innerWidth >= 785 ? "bpl-p1-right" : ""
        }`}
      >
        <Link to={"/blog/" + blog_id} className="bpl-banner-container">
          <img src={banner} alt="" className="bpl-banner" />
        </Link>

        <div className="bpl-info-bar">
          <Link to={"/author/" + username}>
            <img src={profile_img} alt="" className="bpl-pfp" />
          </Link>
          <Link to={/author/ + username} className="bpl-author no-design">
            {TitleCase(name)}
          </Link>

          <div className="bpl-end">
            <p className="bpl-date">26 Sep. 2024</p>
          </div>
        </div>
      </div>

      <div className="bpl-p2">
        <h3 className="bpl-title">{title}</h3>
        <p className="bpl-desc line-clamp-3">{description + "..."}</p>
        <Link
          to={"/blog/" + blog_id}
          className="btn btn-lg btn-outline-dark bpl-view-btn"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
