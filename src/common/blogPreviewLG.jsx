import { Link } from "react-router-dom";
import "../css/common/blogPreviewLG.css";
import { TitleCase } from "./string";

const BlogCard = ({ blog }) => {
  let { blog_id, banner, title, description, tags } = blog;

  return (
    <div className="bpl-container">
      <Link to={"/blog/" + blog_id} className="bpl-linker">
        <div className="bpl-banner-container">
          <img src={banner} alt="" className="bpl-banner" />
        </div>

        <div className="bpl-text">
          <span className="bpl-span">{tags[0]}</span>
          <h3 className="bpl-title">{title}</h3>
          <p className="bpl-desc line-clamp-3">{description + "..."}</p>
          <span className="bpl-read-more">
            Read more{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up-right ml-1 h-4 w-4"
              data-lov-id="src/pages/Index.tsx:220:22"
              data-lov-name="ArrowUpRight"
              data-component-path="src/pages/Index.tsx"
              data-component-line="220"
              data-component-file="Index.tsx"
              data-component-name="ArrowUpRight"
              data-component-content="%7B%22className%22%3A%22ml-1%20h-4%20w-4%22%7D"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
