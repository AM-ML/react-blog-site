import "../css/common/load-more.css";
import AnimationWrapper from "./page-animation";
const LoadMoreBtn = ({ onClick }) => {
  return (
    <AnimationWrapper>
      <div className="lmb-container">
        <button
          onClick={onClick}
          className="btn btn-lg lmb-btn">
          Load More...
        </button>
      </div>
    </AnimationWrapper>
  )
}

export default LoadMoreBtn;
