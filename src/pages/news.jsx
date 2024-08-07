import AnimationWrapper from "../common/page-animation";
import "../css/news.css";

const News = () => {  
  return <AnimationWrapper keyValue={"news"}>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-bold text-primary">
            News
          </h1>
        </div>
      </div>
    </div>
  </AnimationWrapper>
}

export default News;