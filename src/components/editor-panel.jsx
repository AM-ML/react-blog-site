import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import "../css/components/editor-panel.css";
import "../css/components/editor/text-editor.css";
import EditorBanner from "./editor/banner";
import EditorNavBar from "./editor/navbar";
import Title from "./editor/title";
import { EditorContext } from "../pages/editor";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./editor/tools";

const EditorPanel = () => {
  
  let blogContext = useContext(EditorContext);
  let { blog: { title, banner, content, tags, description }, setBlog } = blogContext;
  const [notRenderTwice, setNotRenderTwice] = useState("");

  useEffect(() => {
    let editor = new EditorJS({
      holderId: "textEditor" + notRenderTwice,
      data: '',
      tools: tools,
      placeholder: 'Write blog content here.'
    });
    setNotRenderTwice("randomName");
  }, []);
  
  return (
    <div className="ep-container">
      <EditorNavBar cont={blogContext} />
      <AnimationWrapper>
        <div className="ep-i ep-banner">
          <EditorBanner cont={blogContext}/>
          <Title cont={blogContext}/>

          <hr style={{"opacity": "0.1"}} className="my-3 mb-5" />

          <div id="textEditor" className="ep-text-editor"></div>
        </div>
      </AnimationWrapper>
    </div>

  )
}

export default EditorPanel;