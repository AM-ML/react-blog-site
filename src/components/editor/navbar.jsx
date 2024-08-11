import "../../css/components/editor/navbar.css";

const EditorNavBar = ({ cont }) => {
  let { blog, blog: { title, banner, content, description, tags }, setBlog, setEditorState } = cont;
  
  const handlePublish = () => {
    setEditorState("publish");
  }
  
  return (
    <div className="ep-i ep-navbar">
      <div className="ep-navbar-i ep-i2 ep-navbar-title-container text-clamp">
        <div className="ep-navbar-title text-clamp">{title.length? title : "New Document"}</div>
      </div>
      <div className="ep-navbar-i ep-i2 ep-navbar-end">
        <div className="ep-navbar-i2 ep-i3 ep-navbar-publish">
          <button onClick={handlePublish} className="btn btn-dark ep-navbar-i3 ep-i4 rounded-pill">Publish</button>
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