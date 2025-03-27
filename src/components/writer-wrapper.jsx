import { useContext } from "react";
import { Outlet } from "react-router-dom"
import {UserContext} from "../Router";

const WriterWrapper = () => {
  let { userAuth: {is_author} } = useContext(UserContext);

  return (
    is_author?
      <div className="ww-container">
        <Outlet />
      </div>
      :
      navigate("/")
  )
}

export default WriterWrapper;
