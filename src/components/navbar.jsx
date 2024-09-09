import React, { useState, useContext, useRef } from "react";
import "../css/components/navbar.css";
import logo from "/new3.png";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../Router";
import AnimationWrapper from "../common/page-animation";
import { DropdownContent } from "./navbar-dropdown";
import Footer from "./footer";

const Navbar = () => {
  const { userAuth: { access_token, profile_img, name }, setUserAuth } = useContext(UserContext);


  return (
    <AnimationWrapper key={"navbar"}>
      <div className="np-header">
        <div className="modal fade " id="NavbarSearchModal" tabIndex="-1" aria-labelledby="NavbarSearchModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content border-none bg-transparent ">
              <div className="modal-header border-none">
                <div className="nb-search-container">
                  <input
                   type="text"
                   className="text-input input nb-search shadow-lg form-control"
                   placeholder="Search..."
                   autoFocus
                  />
                </div>
                <button type="button" className="mb-5 bx bx-x" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <span className="text-logo text-serif text-bolder">BOFFO</span>
            </Link>

            <div className=" pb-3 pt-3" style={{"width": "calc(100% - 150px)"}} id="navbarSupportedContent">
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
                  <DropdownContent/>
                </li>
                <li className="nav-item pe-4 dp">
                  <Link role="button"
                    className="dp-btn nav-link active text-sans text-bold text-lg"
                    style={{ "alignItems": "center", "display": "flex" }}>
                    About
                    <i className="bx bx-chevron-down bx-md"></i>
                  </Link>
                  <DropdownContent/>
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
                    <i role="button" data-bs-toggle="modal" data-bs-target="#NavbarSearchModal" className="bx bx-search bx-md"></i>
                  </div>
                  <div>
                  {access_token?
                    <Link to="/dashboard">
                      <img src={profile_img} width={40} />
                    </Link>
                    :
                    <div className="btn-group navbar-special-btn" role="group" aria-label="Basic outlined example">
                      <Link to="/signin" type="button" className="signin-btn btn btn-dark px-3 py-2 ms-0">Sign In</Link>
                    </div>
                  }
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div style={{"minHeight": "100vh"}}>
        <Outlet />
      </div>

      <Footer />
    </AnimationWrapper>
  );
};

export default Navbar;
