import "../css/components/blog-component.css";
import AnimationWrapper from "../common/page-animation";
import { TitleCase } from "../common/string";
import ContentBlock from "../common/content-block";

const BlogPreview = ({ blog }) => {
  let { title, banner, content } = blog;

  return (
    <AnimationWrapper>
      <div className="bbc-container">
        <div className="bbc-title-container">
          <h2 className="bbc-title">{TitleCase(title, false)}</h2>
        </div>

        <div className="bbc-bc aspect-video shadow">
          <img src={banner} alt="" className="bbc-bc-img" />
        </div>

        <div className="bbc-ctbs-container">
          {content.blocks.map((block, i) => {
            return (
              <>
                <div className="bbc-ctb-wrapper" key={i}>
                  <ContentBlock block={block} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default BlogPreview;
