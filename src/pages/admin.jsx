import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import { UserContext } from "../Router";
import "../css/pages/admin.css";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAuthors: 0,
    totalAdmins: 0,
    totalBlogs: 0,
    totalSubscribers: 0
  });
  const [loading, setLoading] = useState(true);
  const {
    userAuth: { access_token }
  } = useContext(UserContext);

  useEffect(() => {
    // Function to fetch admin dashboard stats
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const [usersResponse, authorsResponse, adminsResponse, blogsResponse, subscribersResponse] = await Promise.all([
          axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/users", 
            { limit: 1 }, 
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/users", 
            { role: "author", limit: 1 }, 
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/users", 
            { role: "admin", limit: 1 }, 
            { headers: { Authorization: `Bearer ${access_token}` } }
          ),
          axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs-counter", {}),
          axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/subscribers", 
            { headers: { Authorization: `Bearer ${access_token}` } }
          )
        ]);
        
        setStats({
          totalUsers: usersResponse.data.totalDocs,
          totalAuthors: authorsResponse.data.totalDocs,
          totalAdmins: adminsResponse.data.totalDocs,
          totalBlogs: blogsResponse.data.totalDocs,
          totalSubscribers: subscribersResponse.data.totalSubscribers || 0
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [access_token]);

  return (
    <AnimationWrapper>
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Admin Dashboard</h1>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <i className="fi fi-rr-users admin-stat-icon"></i>
            <div className="admin-stat-data">
              <h3>{loading ? "..." : stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <Link to="/dashboard/admin/users" className="admin-stat-link">View All</Link>
          </div>

          <div className="admin-stat-card">
            <i className="fi fi-rr-edit admin-stat-icon"></i>
            <div className="admin-stat-data">
              <h3>{loading ? "..." : stats.totalAuthors}</h3>
              <p>Total Authors</p>
            </div>
            <Link to="/dashboard/admin/users?role=author" className="admin-stat-link">View All</Link>
          </div>

          <div className="admin-stat-card">
            <i className="fi fi-rr-shield admin-stat-icon"></i>
            <div className="admin-stat-data">
              <h3>{loading ? "..." : stats.totalAdmins}</h3>
              <p>Total Admins</p>
            </div>
            <Link to="/dashboard/admin/users?role=admin" className="admin-stat-link">View All</Link>
          </div>

          <div className="admin-stat-card">
            <i className="fi fi-rr-document admin-stat-icon"></i>
            <div className="admin-stat-data">
              <h3>{loading ? "..." : stats.totalBlogs}</h3>
              <p>Total Blogs</p>
            </div>
            <Link to="/blogs" className="admin-stat-link">View All</Link>
          </div>

          <div className="admin-stat-card">
            <i className="fi fi-rr-envelope admin-stat-icon"></i>
            <div className="admin-stat-data">
              <h3>{loading ? "..." : stats.totalSubscribers}</h3>
              <p>Newsletter Subscribers</p>
            </div>
            <Link to="/dashboard/admin/newsletter" className="admin-stat-link">Manage</Link>
          </div>
        </div>

        <div className="admin-quick-actions">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="admin-actions-grid">
            <Link to="/dashboard/admin/users" className="admin-action-btn">
              <i className="fi fi-rr-user-add"></i>
              <span>Manage Users</span>
            </Link>
            <Link to="/dashboard/admin/newsletter" className="admin-action-btn">
              <i className="fi fi-rr-paper-plane"></i>
              <span>Send Newsletter</span>
            </Link>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminPanel; 