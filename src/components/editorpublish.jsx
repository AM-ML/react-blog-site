import { useContext, useEffect, useRef, useState } from "react";
import "../css/components/editorpublish.css";
import { EditorContext } from "../pages/editor";
import Info from "../common/info-tooltip.jsx";
import AnimationWrapper from "../common/page-animation";
import Content from "../common/content";
import toast, {Toaster} from "react-hot-toast";

const EditorPublishForm = () => {
  const [newTagElement, setNewTagElement] = useState(false);
  const newTagElementRef = useRef(null);
  const [newTag, setNewTag] = useState("");
  const {
    blog,
    blog: { title, banner, content, tags, description },
    setBlog,
    setEditorState
  } = useContext(EditorContext);

  useEffect(() => {
    if (newTagElement && newTagElementRef.current) {
      newTagElementRef.current.focus();
    }
  }, [newTagElement]);

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  const logData = () => {
    console.log(...blog);
  };

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
    let filteredValue = input.value.replace(/[^A-Za-z]/g, '');
    input.value = filteredValue;
    setNewTag(filteredValue);
  };

  const handleTagKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (newTag.trim() !== '') {
        if(tags.length >= 10) {toast.error("Tag Limit Reached!"); return;}
        setBlog({ ...blog, tags: [...tags, newTag] });
        setNewTag('');
        setNewTagElement(false);
      }
    }
  };

  const handleTagClose = (index) => {
    setBlog({
      ...blog,
      tags: tags.filter((_, i) => i !== index)
    });
  };

  return (
    <AnimationWrapper>
      <div className="epf-container">
        <Toaster />
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
              {300 - description.length} characters left
            </span>
            <textarea
              id="articleDescription"
              className="epp-desc-ta shadow-sm"
              placeholder="Description..."
              defaultValue={description}
              maxLength={300}
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
              <span className="epp-tags-left ms-5">{10 - tags.length} Tags Left</span>
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
            {!newTagElement && <i onClick={handleNewTagClick} className="bx bx-plus"></i>}
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
            <button className="btn btn-dark btn-lg ms-auto d-block me-3 epp-publish-btn">
              Publish
            </button>
          </div>
        </div>

        <div className="epf-gi epf-article">
          <div className="epp-preview mb-2">Preview</div>
          <div className="epf-banner aspect-video shadow-lg">
            <img src={banner} className="epf-banner-img" alt="Banner" />
          </div>
          <div className="epp-title">{title}</div>
          <Content content={content} />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default EditorPublishForm;

