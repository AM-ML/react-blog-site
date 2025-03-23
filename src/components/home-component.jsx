import "../css/components/home-component.css";
import robot_img from "../assets/projects/home1.webp";
import AnimationWrapper from "../common/page-animation.jsx";
import BlogCard from "../common/blogPreviewLG.jsx";
import blogsData from "./json/home-component-blogs-data.json"; // Importing pre-fetched blog data
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="hmc-container">
      <div className="hmc-header">
        <div className="layer-img">
          <div className="shadow-overlay"></div>
        </div>
        <div className="hmc-info">
          <div className="hmc-text">
            <div className="title">BOFFO Consulting Group</div>
            <div className="desc">"Consulting for Excellence"</div>
            <div className="hmc-links">
              <Link to="/contact-us" className="hmc-btn">
                Join Us
              </Link>
              <Link to="/about-us/our-story" className="hmc-btn">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <a href="#main" className="h-arrow-c">
          <i className="bx bx-chevron-down h-arrow"></i>
        </a>
      </div>

      <div id="main" className="hmc-main">
        <div className="hmc-main-subcontainer">
          <div className="hmc-list-container">
            <div className="item hmc-bg-c shadow">
              <div className="title">
                <div className="dot"></div>
                Innovation
              </div>
              <div className="text">
                We integrate cutting-edge technology and modern methodologies to
                stay ahead in the industry.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">
                <div className="dot"></div>
                Quality
              </div>
              <div className="text">
                Precision and attention to detail are at the core of every
                project we undertake.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">
                <div className="dot"></div>
                Integrity
              </div>
              <div className="text">
                Transparency, honesty, and professionalism define our
                interactions with clients and partners.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">
                <div className="dot"></div>
                Sustainability
              </div>
              <div className="text">
                We implement eco-friendly and sustainable practices to minimize
                environmental impact.
              </div>
            </div>
          </div>

          <div className="hmc-cts-big-container">
            <div className="hmc-cts-container">
              <div className="hmc-img-container">
                <img src={robot_img} alt="" className="hmc-img" />
              </div>
              <div className="hmc-cts-text-container">
                <div className="hmc-cts-title">
                  Let's Build Something Great Together!
                </div>
                <div className="hmc-cts-desc">
                  <Link className="no-design text-white" to="/contact-us">
                    <u>Contact us.</u>
                  </Link>{" "}
                  Your success is our foundation.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hmc-bps mt-5">
          {blogsData.map((blog, i) => (
            <AnimationWrapper
              transition={{ duration: 1, delay: i * 0.01 }}
              key={i}
            >
              <div className="hmc-bp-container">
                <BlogCard
                  blog={blog}
                  aligned={(i + 1) % 2 === 0 ? "right" : "left"}
                />
              </div>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
