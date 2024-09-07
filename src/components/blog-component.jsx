import "../css/components/blog-component.css";


const BlogComponent = ({ blogId }) => {


  return (
    <div className="bbc-container">
      <div className="bbc-col">
        <div className="bbc-title">{ blogId }</div>
      </div>
    </div>
  )
}

export default BlogComponent;
