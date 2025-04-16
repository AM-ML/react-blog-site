import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import { UserContext } from "../Router";
import "../css/pages/admin.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAuthors: 0,
    totalAdmins: 0,
    totalBlogs: 0,
    totalSubscribers: 0,
  });
  const [loading, setLoading] = useState(true);
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    // Function to fetch admin dashboard stats
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [
          usersResponse,
          authorsResponse,
          adminsResponse,
          blogsResponse,
          subscribersResponse,
        ] = await Promise.all([
          axios.post(
            import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
            { limit: 1 },
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(
            import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
            { role: "author", limit: 1 },
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(
            import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
            { role: "admin", limit: 1 },
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(
            import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs-counter",
            {}
          ),
          axios.get(
            import.meta.env.VITE_SERVER_DOMAIN +
              "/admin/newsletter/subscribers",
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
        ]);

        setStats({
          totalUsers: usersResponse.data.totalDocs,
          totalAuthors: authorsResponse.data.totalDocs,
          totalAdmins: adminsResponse.data.totalDocs,
          totalBlogs: blogsResponse.data.totalDocs,
          totalSubscribers: subscribersResponse.data.totalSubscribers || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [access_token]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "fi-rr-users",
      color: "#15626c",
      link: "/dashboard/admin/users",
      gradient: "0",
    },
    {
      title: "Total Authors",
      value: stats.totalAuthors,
      icon: "fi-rr-edit",
      color: "#2c7a7b",
      link: "/dashboard/admin/users?role=author",
      gradient: "0",
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: "fi-rr-shield",
      color: "#38a169",
      link: "/dashboard/admin/users?role=admin",
      gradient: "0",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: "fi-rr-document",
      color: "#3182ce",
      link: "/blogs",
      gradient: "0",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      icon: "fi-rr-envelope",
      color: "#805ad5",
      link: "/dashboard/admin/newsletter",
      gradient: "0",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      icon: "fi-rr-user-add",
      link: "/dashboard/admin/users",
      color: "#15626c",
    },
    {
      title: "Send Newsletter",
      icon: "fi-rr-paper-plane",
      link: "/dashboard/admin/newsletter",
      color: "#2c7a7b",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <AnimationWrapper>
      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <h1 className="admin-page-title">Admin Dashboard</h1>
          <p className="admin-page-subtitle">
            Welcome to your admin control panel
          </p>
        </div>

        <motion.div
          className="admin-stats-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              className="admin-stat-card"
              variants={item}
              style={{
                background: stat.gradient,
                borderLeft: `4px solid ${stat.color}`,
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="admin-stat-icon" style={{ color: stat.color }}>
                <i className={stat.icon}></i>
              </div>
              <div className="admin-stat-data">
                <h3>
                  {loading ? (
                    <div className="admin-stat-skeleton"></div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {stat.value.toLocaleString()}
                    </motion.span>
                  )}
                </h3>
                <p>{stat.title}</p>
              </div>
              <Link to={stat.link} className="admin-stat-link">
                View All <i className="fi fi-rr-arrow-right"></i>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="admin-dashboard-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">Quick Actions</h2>
            <div className="admin-section-line"></div>
          </div>

          <motion.div
            className="admin-actions-grid"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={action.link} className="admin-action-btn">
                  <div
                    className="admin-action-icon"
                    style={{ color: action.color }}
                  >
                    <i className={action.icon}></i>
                  </div>
                  <span>{action.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminPanel;
