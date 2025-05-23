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
  const blogContext = useContext(EditorContext);
  const {
    blog,
    setBlog,
    textEditor,
    setTextEditor,
  } = blogContext;

  useEffect(() => {
    // Initialize EditorJS - safely handle content that might be undefined or not in expected format
    const editorData = blog && blog.content ? 
      (Array.isArray(blog.content) ? blog.content[0] : blog.content) : 
      { blocks: [] }; // Default empty content
    
    const editor = new EditorJS({
      holderId: "textEditor",
      data: editorData,
      tools: tools,
      placeholder: "Write blog content here.",
    });

    setTextEditor(editor);

    // Cleanup function
    return () => {
      editor.destroy ? editor.destroy() : "";
    };
  }, [setTextEditor]);

  return (
    <div className="ep-container">
      <div className="please_bigger_screen_container">
        <div className="please_bigger_screen">Please Use a Bigger Screen</div>
      </div>
      <EditorNavBar />
      <AnimationWrapper>
        <div className="ep-i ep-banner">
          <EditorBanner />
          <Title />

          <hr style={{ opacity: "0.1" }} className="my-3 mb-5" />

          <div id="textEditor" className="ep-text-editor"></div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default EditorPanel;
