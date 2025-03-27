import "../css/components/home-component.css";
import robot_img from "../assets/projects/home1.webp";
import blogsData from "./json/home-component-blogs-data.json";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

// Lazy load the AnimationWrapper and BlogCard components
const AnimationWrapper = lazy(() => import("../common/page-animation.jsx"));
const BlogCard = lazy(() => import("../common/blogPreviewLG.jsx"));

const HomeComponent = () => {
  return (
    <div className="hmc-container">
      <header className="hmc-header">
        <div className="layer-img">
          <div className="shadow-overlay"></div>
        </div>
        <div className="hmc-info">
          <div className="hmc-text">
            <h1 className="title">BOFFO Consulting Group</h1>
            <p className="desc">"Consulting for Excellence"</p>
            <nav className="hmc-links">
              <Link to="/contact-us" className="hmc-btn">
                Join Us
              </Link>
              <Link to="/about-us/our-story" className="hmc-btn">
                Our Story
              </Link>
            </nav>
          </div>
        </div>
        <a href="#main" className="h-arrow-c">
          <i className="bx bx-chevron-down h-arrow"></i>
        </a>
      </header>

      <main id="main" className="hmc-main">
        <section className="hmc-list-container">
          {["Innovation", "Quality", "Integrity", "Sustainability"].map(
            (item, i) => (
              <div key={i} className="item hmc-bg-c shadow">
                <h2 className="title">
                  <span className="dot"></span> {item}
                </h2>
                <p className="text">
                  {
                    [
                      "We integrate cutting-edge technology and modern methodologies to stay ahead in the industry.",
                      "Precision and attention to detail are at the core of every project we undertake.",
                      "Transparency, honesty, and professionalism define our interactions with clients and partners.",
                      "We implement eco-friendly and sustainable practices to minimize environmental impact.",
                    ][i]
                  }
                </p>
              </div>
            )
          )}
        </section>

        <section className="hmc-cts-container">
          <div className="shadow-overlay"></div>
          <div className="hmc-cts-text-container">
            <h2 className="hmc-cts-title">
              Let's Build Something Great Together!
            </h2>
            <p className="hmc-cts-desc">
              <Link className="no-design text-white" to="/contact-us">
                <u>Contact us.</u>
              </Link>{" "}
              Your success is our foundation.
            </p>
          </div>
        </section>

        <Suspense fallback={<div>Loading Blogs...</div>}>
          <section className="hmc-bps mt-5">
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
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeComponent;
