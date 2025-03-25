import { createContext, useContext, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import EditorPanel from "../components/editor-panel";
import EditorPublishForm from "../components/editorpublish";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../Router";
import Preloader from "../common/preloader";
import axios from "axios";

let blogStructure = {
  title: "",
  banner: "",
  content: "",
  tags: [],
  description: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
        blog_id,
        draft: true,
        mode: "edit",
        incrementVal: 0,
      })
      .then(({ data: { blog } }) => {
        setBlog(blog);
        setLoading(false);
        console.log(blog);
      })
      .catch((err) => {
        setBlog(null);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <AnimationWrapper>
      <EditorContext.Provider
        value={{
          blog,
          setBlog,
          editorState,
          setEditorState,
          textEditor,
          setTextEditor,
        }}
      >
        {access_token === null ? (
          <Navigate to="/signin" />
        ) : loading ? (
          <Preloader />
        ) : editorState == "editor" ? (
          <EditorPanel />
        ) : (
          <EditorPublishForm />
        )}
      </EditorContext.Provider>
    </AnimationWrapper>
  );
};

export default Editor;
