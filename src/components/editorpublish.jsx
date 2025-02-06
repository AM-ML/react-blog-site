import { useContext, useEffect, useRef, useState } from "react";
import "../css/components/editorpublish.css";
import { EditorContext } from "../pages/editor";
import Info from "../common/info-tooltip.jsx";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../Router";
import { useNavigate, useParams } from "react-router-dom";
import BlogPreview from "../common/blogPreview.jsx";

const EditorPublishForm = () => {
  const { blog_id } = useParams();

  let navigate = useNavigate();
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [newTagElement, setNewTagElement] = useState(false);
  const newTagElementRef = useRef(null);
  const [newTag, setNewTag] = useState("");
  const {
    blog,
    blog: { title, banner, content, tags, description },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    if (newTagElement && newTagElementRef.current) {
      newTagElementRef.current.focus();
    }
  }, [newTagElement]);

  const editState = () => {
    setEditorState("editor");
  };

  const handleDescriptionChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, description: input.value });
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleNewTagClick = () => {
    setNewTagElement(true);
    if (newTagElementRef.current) {
      newTagElementRef.current.focus();
    }
  };

  const handleTagChange = (e) => {
    let input = e.target;
    let filteredValue = input.value.replace(/[^A-Za-z-\s]/g, "");
    input.value = filteredValue;
    setNewTag(filteredValue);
  };

  const handleTagKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (newTag.trim() !== "") {
        if (tags.length >= 10) {
          toast.error("Tag Limit Reached!");
          return;
        }

        // Check if the tag already exists
        if (tags.includes(newTag)) {
          toast.error("Tag already exists!");
          return;
        }

        if (newTag.length < 3) {
          toast.error("Tag is too short.");
          return;
        }

        // Add new tag if it's unique
        setBlog({ ...blog, tags: [...tags, newTag] });
        setNewTag("");
        setNewTagElement(false);
      }
    }
  };
  const handleTagClose = (index) => {
    setBlog({
      ...blog,
      tags: tags.filter((_, i) => i !== index),
    });
  };

  const handlePublish = async (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("Must provide a blog title");
    }
    if (!description.length || description.length > 200) {
      return toast.error("Must provide a description under 200 characters");
    }
    if (!banner.length || banner[0] == "/") {
      return toast.error("Must provide a blog banner");
    }
    if (!tags.length || tags.length > 10) {
      return toast.error("Must provide tags with maximum of 10 tags");
    }
    if (!content.blocks.length) {
      return toast.error("Must provide a body to the blog");
    }

    let loadingToast = toast.loading("Publishing Blog...");
    e.target.classList.add("disable");

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
      draft: false,
    };

    await axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/new-blog",
        { ...blogObj },
        config
      )
      .then((data) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Blog Published");
        setTimeout(() => {
          navigate("/blog/" + data.data.id);
        }, 500);
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
  };

  return (
    <AnimationWrapper>
      <div className="epf-container">
        <Toaster />
        <div className="please_bigger_screen_container">
          <div className="please_bigger_screen">Please Use a Bigger Screen</div>
        </div>
        <div className="epf-gi epf-r1">
          <div className="epf-gi-i epf-i2 epf-title text-clamp">{title}</div>
          <div className="epf-gi-i epf-i1 epf-close" onClick={editState}>
            <i className="bx bx-x epf-close"></i>
          </div>
        </div>

        <div className="epp-section mt-3">
          <div className="epp-desc-label">
            <label htmlFor="articleDescription">Description</label>
          </div>
          <div className="epp-desc mb-3">
            <span className="epp-desc-span">
              {200 - description.length} characters left
            </span>
            <textarea
              id="articleDescription"
              className="epp-desc-ta shadow-sm"
              placeholder="Description..."
              defaultValue={description}
              maxLength={200}
              onChange={handleDescriptionChange}
              onKeyDown={handleDescriptionKeyDown}
            ></textarea>
          </div>
          <div className="epp-desc-label">
            <label htmlFor="articleTags">
              <i className="bx bx-tag"></i>
              &nbsp;Tags - &nbsp;
              <Info
                desc="Relevant Blog Topics that Enhance Searchability and Improve Blogs Ranking."
                id="epf-tags-info"
                place="bottom"
              />
              <span className="epp-tags-left ms-5">
                {10 - tags.length} Tags Left
              </span>
            </label>
          </div>
          <div className="epp-tags-container ms-3">
            {newTagElement && (
              <div className="epp-nt-container">
                <input
                  ref={newTagElementRef}
                  type="text"
                  placeholder="New Tag..."
                  className="epp-nt-input"
                  pattern="[A-Za-z]"
                  defaultValue={newTag}
                  onChange={handleTagChange}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
            )}
            {!newTagElement && (
              <i onClick={handleNewTagClick} className="bx bx-plus"></i>
            )}
          </div>

          <div className="epp-tags-flex-container mt-3 ms-3">
            {tags.map((tag, index) => (
              <div key={index} className="epp-tag-item">
                <span className="epp-tag-text">{tag}</span>
                <button
                  className="epp-tag-close-btn"
                  onClick={() => handleTagClose(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="epp-publish">
            <button
              onClick={handlePublish}
              className="btn btn-dark btn-lg ms-auto d-block me-3 epp-publish-btn"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="epf-gi epf-bp-container">
          {console.log(blog)}
          <BlogPreview blog={blog} />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default EditorPublishForm;
