import { useState } from "react"
import AnimationWrapper from "../common/page-animation"
import EditorPanel from "../components/editor-panel"
import EditorPublishForm from "../components/editorpublish";

const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  return (
    <AnimationWrapper>
      { editorState == "editor" ?
          <EditorPanel />
            :
          <EditorPublishForm />
      }
    </AnimationWrapper>
  )
}

export default Editor;