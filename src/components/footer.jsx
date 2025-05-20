import logo from "../assets/footer/new4.webp";
import { Link, useNavigate } from "react-router-dom";
import "../css/components/footer.css";
import { useLegalModals } from "./LegalModals";
import { useNavigation } from "../common/NavigationContext";

const Footer = ({ handleNavigation }) => {
  const { openPrivacyModal, openTermsModal } = useLegalModals();
  const { startNavigation } = useNavigation();
  const navigate = useNavigate();

  // If handleNavigation is not provided (e.g., when used outside the Navbar), create a local version
  const navigateTo = (path) => {
    if (handleNavigation) {
      handleNavigation(path);
    } else {
      startNavigation(path);
      navigate(path);
    }
  };

  return (
    <div className="ftr-container">
      <footer className="ftr">
        <svg
          className="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            className="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>

        <div className="ftr-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <span
                className="footer-logo-link"
                role="button"
                onClick={() => navigateTo("/")}
              >
                <span className="hidden-link-text">LOGO</span>
                <img src={logo} alt="BOFFO LOGO" width="128px" height="168px" />
              </span>
            </div>
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">Call us:</h2>
              <p className="footer-call-to-action-link-wrapper">
                <a
                  className="footer-call-to-action-link"
                  href="tel:+96171553322"
                  target="_self"
                >
                  (+961) 71 55 33 22
                </a>
              </p>
            </div>

            <div className="footer-call-to-action max-760-visible">
              <h2 className="footer-call-to-action-title">Email</h2>
              <p className="footer-call-to-action-description">
                {" "}
                For more info
              </p>
              <a
                className="footer-call-to-action-button button"
                href="mailto:info@boffoconsulting.net"
                target="_self"
              >
                {" "}
                Email Us{" "}
              </a>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Social Links </h2>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="li menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="https://www.linkedin.com/company/boffo-consulting-group">
                    <i className="bx bxl-linkedin me-1"></i>
                    LinkedIn
                  </a>
                </li>
                <li className="f menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#">
                    <i className="bx bxl-facebook-square me-1"></i>
                    Facebook
                  </a>
                </li>
                <li className="ig menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="https://www.instagram.com/boffo_consulting_group">
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
                  <span
                    role="button"
                    onClick={() => navigateTo("/about-us/overview")}
                  >
                    About Us
                  </span>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <span
                    role="button"
                    onClick={() => navigateTo("/about-us/our-story")}
                  >
                    Our Story
                  </span>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <span
                    role="button"
                    onClick={() => navigateTo("/about-us/sustainability")}
                  >
                    Sustainability
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Features</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <span role="button" onClick={() => navigateTo("/blogs")}>
                    Blogs
                  </span>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <span
                    role="button"
                    onClick={() => navigateTo("/about-us/projects")}
                  >
                    Projects
                  </span>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <span role="button" onClick={() => navigateTo("/contact-us")}>
                    Contact Us
                  </span>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Legal</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <button
                    onClick={openPrivacyModal}
                    className="footer-legal-btn"
                  >
                    Privacy
                  </button>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <button onClick={openTermsModal} className="footer-legal-btn">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column max-760-hidden">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">Email</h2>
              <p className="footer-call-to-action-description">
                {" "}
                For more info
              </p>
              <a
                className="footer-call-to-action-button button"
                href="mailto:info@boffoconsulting.net"
                target="_self"
              >
                {" "}
                Email Us{" "}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
