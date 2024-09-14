import {useEffect} from "react";
import "../css/components/blog-card.css";
import {Link} from "react-router-dom";
import {TitleCase} from "../common/string";
import {formatDate} from "../common/functions";
import AnimationWrapper from "../common/page-animation";

const BlogCard = ({ blog, addBorder = true }) => {
  const {
    blog_id,
    banner,
    title,
    description,
    publishedAt,
    tags,
    author: {
      personal_info: {
        name,
        username,
        profile_img
      }
    },

  } = blog;

  return (
    <Link to={"/blog/" + blog_id} className={`bgcd-container-container ${!addBorder && "no-border"}`}>
      <div className="bgcd-container me-2">
        <div className="bgcd-header">
          <img src={profile_img} width={30} alt="" className="bgcd-author-image" />
          <Link
            to = { "/author/" + username }
            className="bgcd-author-name text-clamp">
            {TitleCase(name)}
          </Link>
          <p className="bgcd-header-date">@ { formatDate(publishedAt) }</p>
        </div>
        <h1 className="bgcd-title line-clamp-3">{title}</h1>
        <p className="bgcd-description sm-hidden md-mdxl-hidden line-clamp-2">{description}</p>

        <div className="bgcd-tags">
          { tags.map((tag, i) => {
            if (i > 1) return;
            return <AnimationWrapper key={i} transition={{duration: 1, delay: 0.05 * i}}>
              <span className="bgcd-tag btn rounded-pill">{TitleCase(tag)}</span>
            </AnimationWrapper>
          })
          }
        </div>
      </div>


      <div className="bgcd-banner-container aspect-square">

        <img src={banner} className="w-100 h-100 bgcd-banner"/>
      </div>
    </Link>
  )
}

export default BlogCard;
