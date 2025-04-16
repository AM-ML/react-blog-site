import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import axios from "axios";
import { UserContext } from "../../Router";
import "../../css/components/admin/users.css";
import { formatDate } from "../../common/functions";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    dateEnd: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    userAuth: { access_token, role: currentUserRole },
  } = useContext(UserContext);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
        {
          ...filters,
          page,
          limit: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setFilters({
      query: "",
      role: "all",
      dateStart: "",
      dateEnd: "",
    });
    setSearchParams({});
    fetchUsers(1);
    setIsFilterOpen(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/update-user-role",
        {
          userId,
          newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Update users list
      setUsers(
        users.map((user) =>
          user._id === userId
            ? {
                ...user,
                role: newRole,
                isAuthor:
                  newRole === "author" ||
                  newRole === "admin" ||
                  newRole === "owner",
              }
            : user
        )
      );

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimationWrapper>
      <div className="admin-users">
        <Toaster position="top-right" />

        <div className="admin-users-header">
          <div>
            <h1 className="admin-page-title">User Management</h1>
            <p className="admin-page-subtitle">
              {loading ? "Loading users..." : `${users.length} users found`}
              {filters.role !== "all" && ` with role "${filters.role}"`}
              {filters.query && ` matching "${filters.query}"`}
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <i className="fi fi-rr-filter"></i>
              <span>Filters</span>
              {(filters.query ||
                filters.role !== "all" ||
                filters.dateStart ||
                filters.dateEnd) && (
                <span className="admin-filter-badge"></span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              className="admin-filter-bar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="admin-filter-group">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Name, username, or email"
                  value={filters.query}
                  onChange={(e) =>
                    setFilters({ ...filters, query: e.target.value })
                  }
                  className="admin-search-input"
                />
              </div>

              <div className="admin-filter-group">
                <label>Role</label>
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
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
                <label>Date Range</label>
                <div className="admin-date-inputs">
                  <input
                    type="date"
                    placeholder="From"
                    value={filters.dateStart}
                    onChange={(e) =>
                      setFilters({ ...filters, dateStart: e.target.value })
                    }
                    className="admin-date-input"
                  />
                  <input
                    type="date"
                    placeholder="To"
                    value={filters.dateEnd}
                    onChange={(e) =>
                      setFilters({ ...filters, dateEnd: e.target.value })
                    }
                    className="admin-date-input"
                  />
                </div>
              </div>

              <div className="admin-filter-actions">
                <button onClick={handleFilter} className="admin-filter-btn">
                  <i className="fi fi-rr-search"></i> Apply Filters
                </button>
                <button onClick={handleReset} className="admin-reset-btn">
                  <i className="fi fi-rr-refresh"></i> Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="admin-loading-container">
            <div className="admin-loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <>
            <div className="admin-users-table-container">
              {users.length > 0 ? (
                <motion.table
                  className="admin-users-table"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <thead>
                    <tr>
                      <th>User</th>
                      <th className="hide-on-mobile">Email</th>
                      <th>Role</th>
                      <th className="hide-on-mobile">Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <motion.tr key={user._id} variants={item}>
                        <td className="admin-user-cell">
                          <img
                            src={
                              user.personal_info.profile_img ||
                              "/placeholder.svg"
                            }
                            alt={user.personal_info.name}
                            className="admin-user-img"
                          />
                          <div className="admin-user-info">
                            <div className="admin-user-name">
                              {user.personal_info.name}
                            </div>
                            <div className="admin-user-username">
                              @{user.personal_info.username}
                            </div>
                            <div className="admin-user-email-mobile">
                              {user.personal_info.email}
                            </div>
                          </div>
                        </td>
                        <td className="hide-on-mobile admin-user-email">
                          {user.personal_info.email}
                        </td>
                        <td>
                          <span
                            className={`admin-role-badge role-${user.role}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="hide-on-mobile admin-user-date">
                          {formatDate(user.joinedAt)}
                        </td>
                        <td>
                          {user.role !== "owner" &&
                            !(
                              user.role === "admin" &&
                              currentUserRole === "admin"
                            ) && (
                              <select
                                value=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleRoleChange(user._id, e.target.value);
                                    e.target.value = "";
                                  }
                                }}
                                disabled={
                                  currentUserRole !== "owner" &&
                                  user.role === "admin"
                                }
                                className="admin-role-select"
                              >
                                <option value="">Change Role</option>
                                <option value="user">User</option>
                                <option value="author">Author</option>
                                {currentUserRole === "owner" && (
                                  <option value="admin">Admin</option>
                                )}
                              </select>
                            )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              ) : (
                <div className="admin-no-results">
                  <i className="fi fi-rr-search"></i>
                  <h3>No users found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                  <button onClick={handleReset} className="admin-reset-btn">
                    <i className="fi fi-rr-refresh"></i> Reset Filters
                  </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  onClick={() => fetchUsers(1)}
                  disabled={currentPage === 1}
                  className="admin-pagination-btn"
                  title="First Page"
                >
                  <i className="fi fi-rr-angle-double-left"></i>
                </button>

                <button
                  onClick={() => fetchUsers(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="admin-pagination-btn"
                  title="Previous Page"
                >
                  <i className="fi fi-rr-angle-left"></i>
                </button>

                <span className="admin-pagination-info">
                  Page{" "}
                  <span className="admin-pagination-current">
                    {currentPage}
                  </span>{" "}
                  of {totalPages}
                </span>

                <button
                  onClick={() => fetchUsers(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="admin-pagination-btn"
                  title="Next Page"
                >
                  <i className="fi fi-rr-angle-right"></i>
                </button>

                <button
                  onClick={() => fetchUsers(totalPages)}
                  disabled={currentPage === totalPages}
                  className="admin-pagination-btn"
                  title="Last Page"
                >
                  <i className="fi fi-rr-angle-double-right"></i>
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
