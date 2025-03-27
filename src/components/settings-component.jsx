import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Router";
import "../css/components/settings-component.css";
import ChangePassword from "./dashboard-change-pwd.jsx";

const SettingsComponents = () => {
  let {
    userAuth,
    userAuth: { id, is_author },
    setUserAuth,
  } = useContext(UserContext);
  const makeAuthor = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/make-author", { id: id })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...userAuth, is_author: true })
        );
        setUserAuth({ ...userAuth, is_author: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sc-container">
      <ChangePassword />
    </div>
  );
};

export default SettingsComponents;
