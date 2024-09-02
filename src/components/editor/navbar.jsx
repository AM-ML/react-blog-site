import { useContext } from "react";
import "../../css/components/editor/navbar.css";
import { EditorContext } from "../../pages/editor";
import defaultBanner from "../../assets/blog_banner.png";
import { toast } from "react-hot-toast";

const EditorNavBar = () => {
  let { blog, blog: { title, banner, content, description, tags }, setBlog, setEditorState, textEditor, setTextEditor } = useContext(EditorContext);
  
  const handlePublish = () => {
    if (banner.length == 0 || banner == defaultBanner) {
      toast.error("Upload a Banner Image");
      return;
    }
    if (title.length == 0) {
      toast.error("Enter Title");
      return;
    }
    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        if (data.blocks.length) {
          setBlog({ ...blog, content: data.blocks });
          setEditorState("publish");
        }
      })
    }
  }
  
  return (
    <div className="ep-i ep-navbar">
      <div className="ep-navbar-i ep-i2 ep-navbar-title-container text-clamp">
        <div className="ep-navbar-title text-clamp">{title.length? title : "New Document"}</div>
      </div>
      <div className="ep-navbar-i ep-i2 ep-navbar-end">
        <div className="ep-navbar-i2 ep-i3 ep-navbar-publish">
          <button onClick={handlePublish} 
            className="btn btn-dark ep-navbar-i3 ep-i4 rounded-pill">
              Publish
          </button>
        </div>
        <div className="ep-navbar-i2 ep-i3 ep-navbar-draft">
          <button 
           className="btn btn-secondary ep-navbar-i3 ep-i4 rounded-pill">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorNavBar;