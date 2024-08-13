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
    let { blog, blog: { title, banner, content, tags, description }, setBlog, textEditor, setTextEditor } = blogContext;
    const [notRenderTwice, setNotRenderTwice] = useState("");

    useEffect(() => {
      // Initialize EditorJS with the content
      const editor = new EditorJS({
        holderId: "textEditor",
        data: {blocks: content}, // Ensure content is passed correctly
        tools: tools,
        placeholder: 'Write blog content here.',
      });

      // Save the editor instance to state
      setTextEditor(editor);

      // Cleanup function to destroy the editor instance when the component unmounts or before re-initializing
      return () => {
        if (editor) {
          editor.destroy();
        }
      };
    }, [content]);
    
    return (
      <div className="ep-container">
        <EditorNavBar />
        <AnimationWrapper>
          <div className="ep-i ep-banner">
            <EditorBanner/>
            <Title/>

            <hr style={{"opacity": "0.1"}} className="my-3 mb-5" />

            <div id="textEditor" className="ep-text-editor"></div>
          </div>
        </AnimationWrapper>
      </div>

    )
  }

  export default EditorPanel;