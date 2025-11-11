import React, { useState, useContext, useRef, useCallback, memo } from "react";
import "../css/components/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Router";
import AnimationWrapper from "../common/page-animation";
import { DropdownContent, AboutDropdown } from "./navbar-dropdown";
import Footer from "./footer";
import SideMenu from "./sidemenu";
import { useNavigation } from "../common/NavigationContext";
import NewsletterSubscribe from "./newsletter-subscribe";

const Navbar = () => {
  const {
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);
  const { startNavigation } = useNavigation();

  const searchModalCloseBtn = useRef(null);
  const [search, setSearch] = useState("");
  const [appearSide, setAppearSide] = useState(false);
  const navigate = useNavigate();

  const toggleSideMenu = useCallback(() => {
    setAppearSide((prev) => !prev);
  }, []);

  const handleSearch = useCallback(() => {
    if (search.trim()) {
      startNavigation(`/search/${search}`);
      navigate(`/search/${search}`);
      searchModalCloseBtn.current?.click();
    }
  }, [search, navigate, startNavigation]);

  const handleSearchKeyDown = useCallback(
    (e) => e.key === "Enter" && handleSearch(),
    [handleSearch]
  );

  // Custom navigation handler for links
  const handleNavigation = useCallback(
    (path) => {
      startNavigation(path);
      navigate(path);
      setAppearSide(false);
    },
    [navigate, startNavigation]
  );

  return (
    <AnimationWrapper key="navbar" transition={{ duration: 0.0 }}>
      <div className="np-header">
        {/* Search Modal */}
        <div
          className="custom-navbar-modal modal fade"
          id="NavbarSearchModal"
          tabIndex="-1"
          aria-labelledby="NavbarSearchModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content border-none bg-transparent">
              <div className="modal-header border-none model-specs">
                <div className="nb-search-container">
                  <input
                    type="text"
                    className="text-input input nb-search shadow-lg form-control"
                    placeholder="Search..."
                    onKeyDown={handleSearchKeyDown}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search"
                    autoFocus
                  />
                </div>
                <button
                  ref={searchModalCloseBtn}
                  type="button"
                  className="mb-5 bx bx-x nb-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <div
              className="navbar-sdm-btn-container"
              onClick={toggleSideMenu}
              role="button"
              tabIndex="0"
              aria-label="Toggle side menu"
              onKeyPress={(e) => e.key === "Enter" && toggleSideMenu()}
            >
              <i className="navbar-sdm-btn fa-solid fa-bars"></i>
            </div>
            <span
              className="navbar-brand"
              role="button"
              tabIndex="0"
              onClick={() => handleNavigation("/")}
              onKeyPress={(e) => e.key === "Enter" && handleNavigation("/")}
              aria-label="Go to homepage"
            >
              <span className="text-logo text-serif text-bolder">BOFFO</span>
            </span>

            <div
              className="pb-3 pt-3"
              style={{ width: "calc(100% - 185px)" }}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav w-100">
                <li className="nav-item pe-4 dp">
                  <Link
                    role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ alignItems: "center", display: "flex" }}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Industries <i className="bx bx-chevron-down"></i>
                  </Link>
                  <DropdownContent onNavigate={handleNavigation} />
                </li>
                <li className="nav-item pe-4 dp">
                  <Link
                    role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ alignItems: "center", display: "flex" }}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    About Us <i className="bx bx-chevron-down bx-md"></i>
                  </Link>
                  <AboutDropdown onNavigate={handleNavigation} />
                </li>
                <li className="nav-item pe-4">
                  <span
                    className="nav-link active text-sans text-bold text-lg"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={() => handleNavigation("/blogs")}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleNavigation("/blogs")
                    }
                    tabIndex="0"
                    role="button"
                    aria-label="Navigate to blogs"
                  >
                    Blogs
                  </span>
                </li>
                <li className="nav-item pe-4">
                  <span
                    className="nav-link active text-sans text-bold text-lg"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={() => handleNavigation("/contact-us")}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleNavigation("/contact-us")
                    }
                    tabIndex="0"
                    role="button"
                    aria-label="Navigate to contact us"
                  >
                    Contact Us
                  </span>
                </li>

                {/* Profile / Search */}
                <li className="nav-item nb-end-md ms-auto">
                  <i
                    role="button"
                    tabIndex="0"
                    onClick={() => setAppearSide(false)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && setAppearSide(false)
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#NavbarSearchModal"
                    className="bx bx-search bx-md"
                    aria-label="Open search"
                  ></i>

                  <div className="nb-end-profile-ic">
                    {access_token ? (
                      <span
                        role="button"
                        tabIndex="0"
                        onClick={() => handleNavigation("/dashboard")}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleNavigation("/dashboard")
                        }
                        aria-label="Navigate to dashboard"
                      >
                        <img
                          className="nb-end-profile"
                          src={profile_img}
                          width={40}
                          height={40}
                          alt="Profile"
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <div
                        className="btn-group navbar-special-btn"
                        role="group"
                      >
                        <span
                          role="button"
                          tabIndex="0"
                          onClick={() => handleNavigation("/signin")}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleNavigation("/signin")
                          }
                          className="signin-btn btn btn-dark px-3 py-2 ms-0"
                          aria-label="Sign in"
                        >
                          Sign In
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar & Content */}
      <div
        className={appearSide ? "sdm-nvb-showing" : "sdm-nvb-hidden"}
        style={{ minHeight: "100vh", overflowY: "overlay" }}
      >
        {appearSide && (
          <SideMenu
            appearSide={appearSide}
            setAppearSide={setAppearSide}
            onNavigate={handleNavigation}
          />
        )}
        <Outlet />
      </div>

      <Footer handleNavigation={handleNavigation} />
    </AnimationWrapper>
  );
};

export default memo(Navbar);
