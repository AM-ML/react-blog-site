import logo from "../assets/footer/new4.png";
import {Link} from "react-router-dom";
import "../css/components/footer.css";

const Footer = () => {
  return (
    <div className="ftr-container">
      <footer className="ftr">

        <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path className="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z">
          </path>
        </svg>

        <div className="ftr-content">
          <div className="footer-content-column">
          <div className="footer-logo">
            <Link className="footer-logo-link" to="/">
              <span className="hidden-link-text">LOGO</span>
              <img src={logo} alt="BOFFO LOGO" width="128px"/>
            </Link>
          </div>
          <div className="footer-call-to-action">
            <h2 className="footer-call-to-action-title">Call us:</h2>
            <p className="footer-call-to-action-link-wrapper"> <a className="footer-call-to-action-link" href="tel:+96176168184"
                target="_self">(+961) 76 16 81 84</a></p>
                <p className="footer-call-to-action-link-wrapper">
                  <a className="footer-call-to-action-link" href="tel:+96171553322"
                  target="_self">(+961) 71 55 33 22</a></p>
          </div>


            <div className="footer-call-to-action max-760-visible">
            <h2 className="footer-call-to-action-title">Email</h2>
            <p className="footer-call-to-action-description"> For more info</p>
            <a className="footer-call-to-action-button button" href="mailto:info@boffoconsulting.net" target="_self"> Email Us </a>
          </div>


        </div>
        <div className="footer-content-column">
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Social Links </h2>
            <ul id="menu-get-started" className="footer-menu-list">
              <li className="x menu-item menu-item-type-post_type menu-item-object-product">
                <a href="#">
                  <i className="bx bxl-twitter me-1"></i>
                  Twitter</a>
                </li>
                <li className="li menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#">
                    <i className="bx bxl-linkedin me-1"></i>
                    LinkedIn</a>
                </li>
              <li className="f menu-item menu-item-type-post_type menu-item-object-product">
                <a href="#">
                  <i className="bx bxl-facebook-square me-1"></i>
                  Facebook
                </a>
              </li>
              <li className="ig menu-item menu-item-type-post_type menu-item-object-product">
                <a href="#">
                  <i className="bx bxl-instagram me-1"></i>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Company</h2>
            <ul id="menu-company" className="footer-menu-list">
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">Careers</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">About Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content-column">
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Features</h2>
            <ul id="menu-company" className="footer-menu-list">
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="#">Blogs</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">Projects</a>
              </li>
              <li className="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                <a href="#">Our Services</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Legal</h2>
            <ul id="menu-company" className="footer-menu-list">
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="#">Privacy</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content-column max-760-hidden">
          <div className="footer-call-to-action">
            <h2 className="footer-call-to-action-title">Email</h2>
            <p className="footer-call-to-action-description"> For more info</p>
            <a className="footer-call-to-action-button button" href="mailto:info@boffoconsulting.net" target="_self"> Email Us </a>
          </div>
        </div>
      </div>
      </footer>
    </div>
  )
}

export default Footer;
