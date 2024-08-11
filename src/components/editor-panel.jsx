import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import "../css/components/editor-panel.css";
import EditorBanner from "./editor/banner";
import EditorNavBar from "./editor/navbar";
import Title from "./editor/title";
import { EditorContext } from "../pages/editor";

const EditorPanel = () => {
  
  let blogContext = useContext(EditorContext);
  let { blog: { title, banner, content, tags, description }, setBlog } = blogContext;
  
  return (
    <div className="ep-container">
      <EditorNavBar cont={blogContext} />
      <AnimationWrapper>
        <div className="ep-i ep-banner">
          <EditorBanner cont={blogContext}/>
          <Title cont={blogContext}/>

          <hr style={{"opacity": "0.1"}} className="my-3 mb-5" />
        </div>
      </AnimationWrapper>
    </div>
  )
}

export default EditorPanel;