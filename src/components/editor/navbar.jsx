import { useContext } from "react";
import "../../css/components/editor/navbar.css";
import { EditorContext } from "../../pages/editor";
import defaultBanner from "../../assets/blog_banner.webp";
import { toast } from "react-hot-toast";
import { UserContext } from "../../Router";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditorNavBar = () => {
  const { blog_id } = useParams();
  let {
    blog,
    blog: { title, banner, content, description, tags },
    setBlog,
    setEditorState,
    textEditor,
  } = useContext(EditorContext);
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

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
          setBlog({ ...blog, content: data });
          setEditorState("publish");
        }
      });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("Draft must have a title");
    }

    e.target.classList.add("disable");
    let loadingToast = toast.loading("Saving Draft");
    if (textEditor.isReady && textEditor.save) {
      textEditor
        .save()
        .then(async (data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
          }
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access_token,
            },
          };
          let blogObj = {
            tags,
            title,
            content,
            banner,
            description,
            draft: true,
          };

          await axios
            .post(
              import.meta.env.VITE_SERVER_DOMAIN + "/new-blog",
              { ...blogObj, id: blog_id },
              config
            )
            .then((data) => {
              e.target.classList.remove("disable");
              toast.dismiss(loadingToast);
              toast.success("Blog Draft Saved");
            })
            .catch(({ response }) => {
              e.target.classList.remove("disable");
              toast.dismiss(loadingToast);

              const errorMessage =
                typeof response.data.error === "string"
                  ? response.data.error
                  : "An error occurred.";

              return toast.error(errorMessage);
            });
        })
        .catch((err) => {
          e.target.classList.remove("disable");
          toast.dismiss(loadingToast);
          console.log(err);
          return toast.error("an error occurred while saving draft");
        });
    }
  };

  return (
    <div className="ep-i ep-navbar">
      <div className="ep-navbar-i ep-i2 ep-navbar-title-container text-clamp">
        <div className="ep-navbar-title text-clamp">
          {title.length ? title : "New Document"}
        </div>
      </div>
      <div className="ep-navbar-i ep-i2 ep-navbar-end">
        <div className="ep-navbar-i2 ep-i3 ep-navbar-publish">
          <button
            onClick={handlePublish}
            className="btn btn-dark ep-navbar-i3 ep-i4 rounded-pill"
          >
            Publish
          </button>
        </div>
        <div className="ep-navbar-i2 ep-i3 ep-navbar-draft">
          <button
            className="btn btn-secondary ep-navbar-i3 ep-i4 rounded-pill"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorNavBar;
