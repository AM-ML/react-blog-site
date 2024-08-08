import { useState } from "react";
import { Outlet } from "react-router-dom"
import NotWriterComponent from "./notwritercomponent";

const WriterWrapper = () => {
  let [isWriter, setIsWriter] = useState(true); // set to false
  //! TODO: validate account blog-writer position.

  return (
    isWriter?
    <div className="ww-container">
      <Outlet />
    </div>
    :
    <NotWriterComponent />
  )
}

export default WriterWrapper;