import { useContext, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../Router";
import "../css/components/admin-wrapper.css";
import Preloader from "../common/preloader";

const AdminWrapper = () => {
  const navigate = useNavigate();
  const {
    userAuth,
    userAuth: { access_token, role }
  } = useContext(UserContext);

  useEffect(() => {
    // Check if user is authenticated
    if (!access_token) {
      navigate("/signin");
      return;
    }

    // Check if user has admin privileges
    if (role !== 'admin' && role !== 'owner') {
      navigate("/dashboard");
    }
  }, [access_token, role, navigate]);

  if (!access_token) {
    return <Preloader />;
  }

  if (role !== 'admin' && role !== 'owner') {
    return <Preloader />;
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin</h2>
        <ul className="admin-sidebar-menu">
          <li>
            <Link to="/dashboard/admin" className="admin-menu-item">
              <i className="fi fi-rr-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/users" className="admin-menu-item">
              <i className="fi fi-rr-users"></i>
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/newsletter" className="admin-menu-item">
              <i className="fi fi-rr-envelope"></i>
              <span>Newsletter</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminWrapper; 