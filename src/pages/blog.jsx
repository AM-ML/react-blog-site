import {useParams} from "react-router-dom";
import AnimationWrapper from "../common/page-animation"
import BlogComponent from "../components/blog-component";

const Blog = () => {
  const { id } = useParams();
  return (
    <AnimationWrapper>
      <div><BlogComponent blogId = {id}/></div>
    </AnimationWrapper>
  )
}

export default Blog;
