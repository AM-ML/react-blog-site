import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import axios from "axios";
import { UserContext } from "../../Router";
import "../../css/components/admin/users.css";
import { formatDate } from "../../common/functions";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    query: "",
    role: searchParams.get("role") || "all",
    dateStart: "",
    dateEnd: ""
  });

  const {
    userAuth: { access_token, role: currentUserRole }
  } = useContext(UserContext);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
        {
          ...filters,
          page,
          limit: 10
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchUsers(1);
    
    // Update URL parameters
    const params = {};
    if (filters.query) params.query = filters.query;
    if (filters.role !== "all") params.role = filters.role;
    if (filters.dateStart) params.dateStart = filters.dateStart;
    if (filters.dateEnd) params.dateEnd = filters.dateEnd;
    
    setSearchParams(params);
  };

  const handleReset = () => {
    setFilters({
      query: "",
      role: "all",
      dateStart: "",
      dateEnd: ""
    });
    setSearchParams({});
    fetchUsers(1);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/update-user-role",
        {
          userId,
          newRole
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      
      // Update users list
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole, isAuthor: newRole === 'author' || newRole === 'admin' || newRole === 'owner' } : user
      ));
      
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(error.response?.data?.error || "Failed to update user role");
    }
  };

  useEffect(() => {
    // Get initial filters from URL
    const query = searchParams.get("query") || "";
    const role = searchParams.get("role") || "all";
    const dateStart = searchParams.get("dateStart") || "";
    const dateEnd = searchParams.get("dateEnd") || "";
    
    setFilters({ query, role, dateStart, dateEnd });
    
    fetchUsers(1);
  }, [searchParams]);

  return (
    <AnimationWrapper>
      <div className="admin-users">
        <Toaster />
        <h1 className="admin-page-title">User Management</h1>
        
        <div className="admin-filter-bar">
          <div className="admin-filter-group">
            <input
              type="text"
              placeholder="Search by name, username, or email"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              className="admin-search-input"
            />
          </div>
          
          <div className="admin-filter-group">
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="admin-filter-select"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          
          <div className="admin-filter-group">
            <input
              type="date"
              placeholder="From"
              value={filters.dateStart}
              onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
              className="admin-date-input"
            />
            <input
              type="date"
              placeholder="To"
              value={filters.dateEnd}
              onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
              className="admin-date-input"
            />
          </div>
          
          <button onClick={handleFilter} className="admin-filter-btn">Filter</button>
          <button onClick={handleReset} className="admin-reset-btn">Reset</button>
        </div>
        
        {loading ? (
          <div className="admin-loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="admin-users-table-container">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="admin-user-cell">
                        <img 
                          src={user.personal_info.profile_img} 
                          alt={user.personal_info.name} 
                          className="admin-user-img"
                        />
                        <div className="admin-user-info">
                          <div className="admin-user-name">{user.personal_info.name}</div>
                          <div className="admin-user-username">@{user.personal_info.username}</div>
                        </div>
                      </td>
                      <td>{user.personal_info.email}</td>
                      <td>
                        <span className={`admin-role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{formatDate(user.joinedAt)}</td>
                      <td>
                        {user.role !== 'owner' && (
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) {
                                handleRoleChange(user._id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            disabled={currentUserRole !== 'owner' && user.role === 'admin'}
                            className="admin-role-select"
                          >
                            <option value="">Change Role</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>
                            {currentUserRole === 'owner' && (
                              <option value="admin">Admin</option>
                            )}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {users.length === 0 && (
              <div className="admin-no-results">
                No users found matching your criteria
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  onClick={() => fetchUsers(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="admin-pagination-btn"
                >
                  <i className="fi fi-rr-arrow-left"></i>
                </button>
                
                <span className="admin-pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => fetchUsers(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="admin-pagination-btn"
                >
                  <i className="fi fi-rr-arrow-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default AdminUsers; 