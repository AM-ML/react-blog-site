import React, { useState, useContext, useRef } from "react";
import "../css/components/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Router";
import AnimationWrapper from "../common/page-animation";
import { DropdownContent, CareersDropdown, AboutDropdown } from "./navbar-dropdown";
import Footer from "./footer";
import SideMenu from "./sidemenu";

const Navbar = () => {
  const { userAuth: { access_token, profile_img } } = useContext(UserContext);
  const searchModalCloseBtn = useRef(null);
  const [search, setSearch] = useState(null);
  const [appearSide, setAppearSide] = useState(false);

  const toggleSideMenu = () => {
    setAppearSide(!appearSide);
    console.log(appearSide);
  }

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search/" + search);
    searchModalCloseBtn.current.click();
  }

  const handleSearchKeyDown = (e) => {
    if( e.keyCode == 13)
      handleSearch();
  }

  const handleSearchChange = (e) => {
    let elemS = e.target;

    setSearch(elemS.value);
  }


  return (
    <AnimationWrapper key={"navbar"}>
      <div className="np-header">
        <div className="custom-navbar-modal modal fade " id="NavbarSearchModal" tabIndex="-1" aria-labelledby="NavbarSearchModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content border-none bg-transparent ">
              <div className="modal-header border-none">
                <div className="nb-search-container">
                  <input
                   type="text"
                   className="text-input input nb-search shadow-lg form-control"
                   placeholder="Search..."
                   onKeyDown={handleSearchKeyDown}
                   onChange={handleSearchChange}
                   autoFocus
                  />
                </div>
                <button ref={searchModalCloseBtn} type="button" className="mb-5 bx bx-x" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <div className="navbar-sdm-btn-container"
              onClick={toggleSideMenu}
              role="button"
            >
              <i
                className="navbar-sdm-btn fa-solid fa-bars"></i>
            </div>
            <Link className="navbar-brand" to="/"
              onClick={() => {setAppearSide(false)}}
            >
              <span className="text-logo text-serif text-bolder">BOFFO</span>
            </Link>

            <div className=" pb-3 pt-3" style={{"width": "calc(100% - 185px)"}} id="navbarSupportedContent">
              <ul className="navbar-nav w-100">
                <li className="nav-item pe-4 dp">
                  <Link role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ "alignItems": "center", "display": "flex" }}>
                   Industries
                    <i className="bx bx-chevron-down"></i>
                  </Link>
                  <DropdownContent/>
                </li>
                <li className="nav-item pe-4 dp">
                  <Link role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ "alignItems": "center", "display": "flex" }}>
                    Careers
                    <i className="bx bx-chevron-down bx-md"></i>
                  </Link>
                  <CareersDropdown/>
                </li>
                <li className="nav-item pe-4 dp">
                  <Link role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ "alignItems": "center", "display": "flex" }}>
                    About Us
                    <i className="bx bx-chevron-down bx-md"></i>
                  </Link>
                  <AboutDropdown/>
                </li>
                <li className="nav-item pe-4">
                  <Link role="button"
                    className="nav-link active text-sans text-bold text-lg"
                    style={{ "alignItems": "center", "display": "flex"}} to="/blogs">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item nb-end-md ms-auto">
                  <div>
                    <i role="button" onClick={() => {setAppearSide(false)}} data-bs-toggle="modal" data-bs-target="#NavbarSearchModal" className="bx bx-search bx-md"></i>
                  </div>
                  <div className="nb-end-profile-ic" >
                  {access_token?
                    <Link to="/dashboard" onClick={() => {setAppearSide(false)}}>
                      <img className="nb-end-profile" src={profile_img} width={40} />
                    </Link>
                    :
                    <div className="btn-group navbar-special-btn" role="group" aria-label="Basic outlined example">
                      <Link to="/signin" onClick={() => {setAppearSide(false)}} type="button" className="signin-btn btn btn-dark px-3 py-2 ms-0">Sign In</Link>
                    </div>
                  }
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div style={{"minHeight": "100vh", "overflowY": "overlay"}}>
        {appearSide && <SideMenu appearSide={appearSide} setAppearSide={setAppearSide}/>}
        <Outlet />
      </div>

      <Footer />
    </AnimationWrapper>
  );
};

export default Navbar;
