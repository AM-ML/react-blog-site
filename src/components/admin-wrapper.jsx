import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../Router";
import "../css/components/admin-wrapper.css";
import Preloader from "../common/preloader";
import { AnimatePresence, motion } from "framer-motion";

const AdminWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const {
    userAuth,
    userAuth: { access_token, role },
  } = useContext(UserContext);

  useEffect(() => {
    // Check if user is authenticated
    if (!access_token) {
      navigate("/signin");
      return;
    }

    // Check if user has admin privileges
    if (role !== "admin" && role !== "owner") {
      navigate("/dashboard");
    }
  }, [access_token, role, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  if (!access_token) {
    return <Preloader />;
  }

  if (role !== "admin" && role !== "owner") {
    return <Preloader />;
  }

  const menuItems = [
    { path: "/dashboard/admin", icon: "fi-rr-dashboard", label: "Dashboard" },
    { path: "/dashboard/admin/users", icon: "fi-rr-users", label: "Users" },
    {
      path: "/dashboard/admin/newsletter",
      icon: "fi-rr-envelope",
      label: "Newsletter",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`admin-wrapper ${
        isSidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Mobile Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <motion.div
          className="admin-sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`admin-sidebar ${isMobile ? "mobile" : ""} ${
          isMobileSidebarOpen ? "open" : ""
        }`}
        animate={{
          width: isMobile
            ? isMobileSidebarOpen
              ? "280px"
              : "0px"
            : isSidebarCollapsed
            ? "80px"
            : "280px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="admin-sidebar-header">
          <motion.h2
            className="admin-sidebar-title"
            animate={{ opacity: isSidebarCollapsed && !isMobile ? 0 : 1 }}
          >
            {!isSidebarCollapsed || isMobile ? "Admin Panel" : ""}
          </motion.h2>

          {!isMobile && (
            <button
              className="admin-sidebar-toggle"
              onClick={toggleSidebar}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              <i
                className={`fi ${
                  isSidebarCollapsed ? "fi-rr-angle-right" : "fi-rr-angle-left"
                }`}
              ></i>
            </button>
          )}
        </div>

        <ul className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`admin-menu-item ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                <i className={item.icon}></i>
                <motion.span
                  animate={{
                    opacity: isSidebarCollapsed && !isMobile ? 0 : 1,
                    display:
                      isSidebarCollapsed && !isMobile ? "none" : "inline",
                  }}
                  transition={{ opacity: { duration: 0.2 } }}
                >
                  {item.label}
                </motion.span>
                {isActive(item.path) && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="admin-sidebar-footer">
          <Link to="/dashboard" className="admin-back-link">
            <i className="fi fi-rr-arrow-left"></i>
            <motion.span
              animate={{
                opacity: isSidebarCollapsed && !isMobile ? 0 : 1,
                display: isSidebarCollapsed && !isMobile ? "none" : "inline",
              }}
            >
              Back to Dashboard
            </motion.span>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="admin-content-wrapper">
        <div className="admin-topbar">
          <button
            className="admin-mobile-menu-toggle"
            onClick={toggleSidebar}
            aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
          >
            <i
              className={`fi ${
                isMobileSidebarOpen ? "fi-rr-cross" : "fi-rr-menu-burger"
              }`}
            ></i>
          </button>

          <div className="admin-page-path">
            <span>Admin</span>
            <i className="fi fi-rr-angle-right"></i>
            <span>
              {location.pathname === "/dashboard/admin"
                ? "Dashboard"
                : location.pathname.includes("/users")
                ? "Users"
                : "Newsletter"}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="admin-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminWrapper;

