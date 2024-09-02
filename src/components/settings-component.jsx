import { useContext, useState } from "react";
import { UserContext } from "../Router";
import axios from "axios";



const SettingsComponents = () => {
  let { userAuth, userAuth: { id, is_author }, setUserAuth } = useContext(UserContext);
  const makeAuthor = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/make-author", {"id": id})
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("user", JSON.stringify({...userAuth, "is_author": true}));
      setUserAuth({...userAuth, is_author: true});
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="sc-container p-2">
      <h1 className="sc-title">Settings Page</h1>
      <div className="row">
        {is_author? <div className="col bg-success text-white py-3 text-bold rounded-5 ms-3 text-center">Author</div>
          : <div className="col bg-danger text-white text-bold py-3 text-center rounded-5 ms-3">Not Author</div>}
        <div className="col"><button onClick={makeAuthor} className="py-4 btn btn-lg btn-dark">Author Toggle</button></div>
      </div>
    </div>
  )
}

export default SettingsComponents;