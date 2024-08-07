import React, { useState, useContext } from "react";
import "../css/components/navbar.css";
import logo from "/new3.png";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../Router";
import AnimationWrapper from "../common/page-animation";
import { TitleCase } from "../common/string";

const Navbar = () => {
  const [servicesClicked, setServicesClicked] = useState(false);
  
  const handleServicesClicked = () => {
    setServicesClicked(!servicesClicked);
  };
  
  const { userAuth: { access_token, profile_img, name }, setUserAuth } = useContext(UserContext);


  const ServicesDropdown = () => {

    return (
    <div className="dropdown-content-custom bg-white">
      <div className="row-custom">
        <div className="column-custom" style={{"height": "10.2rem"}}>
          <h3><Link to="/services/adv/financial">Financial Advisory</Link></h3>
          <p>
            <Link to="/services/financial-analysis">Financial Analysis</Link><br/>
            <Link to="/services/feasibility-study">Feasibility Study</Link><br/>
            <Link to="/services/business-plans">Business Plans</Link>
          </p>
        </div>
        <div className="column-custom" style={{"height": "10.2rem"}}>
          <h3><Link to="/services/adv/design">Design Advisory</Link></h3>
          <p>
            <Link to="/services/design">Interior / Exterior Design</Link><br/>
            <Link to="/services/architecture-drawing">Architecture Drawing</Link><br/>
            <Link to="/services/graphic-design">Graphic Design</Link>
          </p>
        </div>
        <div className="column-custom mb-3" style={{"height": "10.2rem"}}>
          <h3><Link to="/services/adv/brick">Brick Advisory</Link></h3>
          <p>
            <Link to="/services/civil-engineering">Civil Engineering</Link><br/>
            <Link to="/services/construction">Construction</Link><br/>
            <Link to="/services/procurement">Procurement</Link>
          </p>
        </div>
      </div>
      <div className="row-custom">
        <div className="column-custom" style={{"height":"13rem"}}>
          <h3><Link to="/services/adv/management">Management Handling</Link></h3>
          <p>
            <Link to="/services/project-management">Project Management</Link><br/>
            <Link to="/services/waste-management">Waste Management</Link><br/>
            <Link to="/services/alternative-energy">Alternative Energy</Link>
          </p>
        </div>
        <div className="column-custom" style={{"height":"6rem"}}>
          <h3><Link to="/services/adv/sustainability">Sustainability</Link></h3>
        </div>
      </div>
    </div>
    );
  }

  
  return (
    <AnimationWrapper key={"navbar"}>
      <div className="np-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} width={64} alt="Logo" />
              <span style={{ "marginLeft": "-0.8rem" }} className="text-logo text-serif text-bolder">BOFFO</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse border-bottom pb-3 pt-3" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
                <li className={`nav-item me-4 dropdown-custom ${servicesClicked ? 'dropdown-custom-clicked' : ''}`}>
                  <Link role="button"
                    className="dropbtn-custom dropdown-button nav-link active text-sans text-bold text-lg"
                    aria-current="page"
                    onClick={handleServicesClicked}
                    style={{ "alignItems": "center", "display": "flex" }}>
                    Services
                    <i className={`bx ${servicesClicked ? "bx-chevron-up" : "bx-chevron-down"} bx-md`}></i>
                  </Link>
                  <div className="dropdown-content-custom bg-white">
                    <ServicesDropdown/>
                  </div>
                </li>
                <li className="nav-item me-4">
                  <Link role="button"
                    className="dropbtn-custom dropdown-button nav-link active text-sans text-bold text-lg"
                    aria-current="page"
                    style={{ "alignItems": "center", "display": "flex" }}>
                    Careers
                    <i className={`bx ${"bx-chevron-down"} bx-md`}></i>
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link role="button"
                    className="dropbtn-custom dropdown-button nav-link active text-sans text-bold text-lg"
                    aria-current="page"
                    style={{ "alignItems": "center", "display": "flex" }}>
                    About
                    <i className={`bx ${"bx-chevron-down"} bx-md`}></i>
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link role="button"
                    className="nav-link active text-sans text-bold text-lg"
                    aria-current="page"
                    style={{ "alignItems": "center", "display": "flex" }} to="/blogs">
                    Blogs
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2 navbar-search-input" type="search" placeholder="Search" aria-label="Search" />
              </form>
              {
                access_token ?
                  <Link to="/dashboard" style={{ "justifyItems": "center", "minWidth": "fit-content", "maxWidth": "250px !important", "textDecoration": "none" }}>
                    <img
                      className="profile-dropdown-avatar"
                      src={profile_img} alt="Profile" width={48}
                      role="button"
                    />
                    <p className="profile-dropdown-username">
                      {TitleCase(name)}
                    </p>
                  </Link>
                  :
                  <div className="btn-group navbar-special-btn" role="group" aria-label="Basic outlined example">
                    <Link to="/signin" type="button" className="signin-btn btn btn-dark px-3 py-2 ms-0">Sign In</Link>
                    <Link to="/signup" type="button" className="signin-btn bg-gray btn btn-outline-dark px-3 py-2 ms-0">Sign Up</Link>
                  </div>
              }
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </AnimationWrapper>
  );
};

export default Navbar;
