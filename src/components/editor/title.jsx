import { useContext } from "react";
import "../../css/components/editor/title.css"
import { EditorContext } from "../../pages/editor";

const Title = () => {
  let { blog, blog: { title, banner, content, tags, description }, setBlog } = useContext(EditorContext);

  const handleTitleKeyDown = (e) => {
    if(e.keyCode == 13) {
      e.preventDefault();
    }
  }
  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: e.target.value.trim() });
  }
  return (
    <textarea
    placeholder="Title.."
    defaultValue={title}
    className="editor-title"
    rows={1}
    onKeyDown={handleTitleKeyDown}
    onChange={handleTitleChange}
    autoFocus
    ></textarea>
  )
}

export default Title;
