import { Link } from "react-router-dom";
import "../css/components/dashnav.css";
import { useContext } from "react";
import { UserContext } from "../Router";
import { removeFromSession } from "./session";

const DashNav = () => {
  let {
    userAuth: { username, role, is_author },
    setUserAuth,
  } = useContext(UserContext);

  const isAuthor = role == "author";
  const isAdmin = role == "admin";

  const handleLogOut = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <div className="dsn-container">
      <Link className="dsn-item no-design" to="/">
        <i className="dsn-icon bx bx-home"></i>
      </Link>
      <Link className="dsn-item no-design" to="/dashboard">
        <i className="dsn-icon bx bx-grid-alt"></i>
      </Link>
      <Link className="dsn-item no-design" to="/dashboard/favorites">
        <i className="bx bx-bookmark"></i>
      </Link>
      {(isAuthor || isAdmin || is_author) && (
        <Link className="dsn-item no-design" to="/dashboard/writer/drafts">
          <i className="dsn-icon bx bx-file"></i>
        </Link>
      )}
      {(isAuthor || isAdmin || is_author) && (
        <Link
          className="dsn-item no-design"
          to={"/dashboard/author/" + username}
        >
          <i className="dsn-icon bx bx-user"></i>
        </Link>
      )}
      {isAdmin && (
        <Link className="dsn-item no-design" to="/dashboard/admin">
          <i className="bx bx-shield"></i>
        </Link>
      )}
      <Link className="dsn-item no-design" to="/dashboard/settings">
        <i className="dsn-icon bx bx-cog"></i>
      </Link>
      <button
        role="button"
        className="dsn-item no-design"
        onClick={handleLogOut}
      >
        <i className="dsn-icon bx bx-log-out"></i>
      </button>
    </div>
  );
};

export default DashNav;
