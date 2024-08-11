import { createContext, useState } from "react"
import AnimationWrapper from "../common/page-animation"
import EditorPanel from "../components/editor-panel"
import EditorPublishForm from "../components/editorpublish";

let blogStructure = {
  title: '',
  banner: '',
  content: '',
  tags: [],
  description: '',
  author: { personal_info: {  } }
}

export const EditorContext = createContext({  });

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  
  return (
    <AnimationWrapper>
      <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState }}>
        { editorState == "editor" ?
            <EditorPanel />
              :
            <EditorPublishForm />
        }
      </EditorContext.Provider>
    </AnimationWrapper>
  )
}

export default Editor;