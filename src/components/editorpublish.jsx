import { useContext } from "react";
import "../css/components/editorpublish.css";
import { EditorContext } from "../pages/editor";
import AnimationWrapper from "../common/page-animation";
import Content from "../common/content";


const EditorPublishForm = () => {
  let {
    blog, 
    blog: { title, banner, content, tags, description }, 
    setBlog, 
    setEditorState, 
    textEditor, 
    setTextEditor
  } = useContext(EditorContext);
  
  const logData = () => {
    console.log(blog);
  }

  const editState = () => {
    setEditorState("editor");
  }

  const handleDescriptionChange = (e) => {
    let input = e.target;
    setBlog({...blog, description: input.value});
  }
  
  return (
    <AnimationWrapper>
      <div className="epf-container">
        <div className="epf-gi epf-r1">
          <div className="epf-gi-i epf-i2 epf-title text-clamp">{title}</div>
          <div className="epf-gi-i epf-i1 epf-close" onClick={editState}>
            <i className="bx bx-x epf-close"></i>
          </div>
        </div>

        <div className="epp-section mt-3">
          <div className="epp-desc-label">
            <label htmlFor="articleDescription">Description</label>
          </div>
          <div className="epp-desc mb-3 ">
            <textarea 
            id="articleDescription" 
            className="epp-desc-ta shadow-sm"
            placeholder="Description..."
            defaultValue={description}
            onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="epp-desc-label">
            <label htmlFor="articleTags"><i className="bx bx-tag"></i> Tags</label>
          </div>
          <div className="epp-tags-container ms-3">
            <i className="bx bx-plus"></i>
          </div>
          <div className="epp-publish">
            <button className="btn btn-dark btn-lg ms-auto d-block me-3 epp-publish-btn">
              Publish
            </button>
          </div>
        </div>

        <div className="epf-gi epf-article">
          <div className="epp-preview mb-2">Preview</div>
          <div className="epf-banner aspect-video shadow-lg">
            <img src={banner} className="epf-banner-img"/>
          </div>
          <div className="epp-title">
            {title}
          </div>
          <Content content={content} />
        </div>
      </div>
    </AnimationWrapper>
  )
}

export default EditorPublishForm;
