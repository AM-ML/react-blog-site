import { useEffect } from "react";
import "../css/common/content.css";

const Content = ({ content }) => {
  useEffect(() => {
    console.log(content);
  }, [])
  return (
    <>
    </>
  );
}

export default Content;