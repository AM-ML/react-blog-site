import { useContext } from "react";
import "../css/components/editorpublish.css";
import { EditorContext } from "../pages/editor";
import AnimationWrapper from "../common/page-animation";


const EditorPublishForm = () => {
  let {blog, blog: { title, banner, content, tags, description }, setBlog, setEditorState, textEditor, setTextEditor} = useContext(EditorContext);
  
  const logData = () => {
    console.log(blog);
  }

  const editState = () => {
    setEditorState("editor");
  }
  
  return (
    <AnimationWrapper>
      <div className="epf-container">
        <div className="epf-gi epf-r1">
          <div className="epf-gi-i epf-i1" onClick={editState}>
            <i className="bx bx-x"></i>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  )
}

export default EditorPublishForm;