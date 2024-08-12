import "../../css/components/editor/title.css"

const Title = ({ cont }) => {
  let { blog, blog: { title, banner, content, tags, description }, setBlog } = cont;
  
  const handleTitleKeyDown = (e) => {
    if(e.keyCode == 13) {
      e.preventDefault();
    }
  }
  const handleTitleChange = (e) => {
    let input = e.target;
    
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    
    setBlog({ ...blog, title: e.target.value });
  }
  return (
    <textarea 
    placeholder="Title.." 
    className="editor-title"
    rows={1}
    onKeyDown={handleTitleKeyDown}
    onChange={handleTitleChange}
    autoFocus
    ></textarea>
  )
}

export default Title;