import AnimationWrapper from "../common/page-animation";
import "../css/components/navbar.css";
import logo from "/new3.png";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} width={64} alt="" />
            <span style={{ "marginLeft": "-0.8rem" }} className="text-logo text-serif text-bolder">BOFFO</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse border-bottom pb-3 pt-3" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 ">
              <li className="nav-item me-4">
                <Link className="nav-link active text-sans text-bold text-lg" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active text-sans text-bold text-lg" aria-current="page" to="/news">News</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active text-sans text-bold text-lg" aria-current="page" to="/blogs/economy">Economy</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active text-sans text-bold text-lg" aria-current="page" to="/news/lebanon">Lebanon</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active text-sans text-bold text-lg" aria-current="page" to="/articles ">Articles</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
              <Link to="/signin" type="button" className="signin-btn btn btn-dark px-3 py-2 ms-0">Sign In</Link>
              <Link to="/signup" type="button" className="signin-btn bg-gray btn btn-outline-dark px-3 py-2 ms-0">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
