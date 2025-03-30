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
              <div key={i} className="item hmc-bg-c">
                <div
                  data-lov-id="src/pages/Index.tsx:123:16"
                  data-lov-name="div"
                  data-component-path="src/pages/Index.tsx"
                  data-component-line="123"
                  data-component-file="Index.tsx"
                  data-component-name="div"
                  data-component-content="%7B%22className%22%3A%22p-3%20bg-gray-50%20rounded-full%20w-fit%20mb-6%22%7D"
                  class="p-3 bg-gray-50 rounded-full w-fit mb-6 item-icon"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chart-column h-6 w-6"
                    data-lov-id="src/pages/Index.tsx:82:22"
                    data-lov-name="BarChart3"
                    data-component-path="src/pages/Index.tsx"
                    data-component-line="82"
                    data-component-file="Index.tsx"
                    data-component-name="BarChart3"
                    data-component-content="%7B%22className%22%3A%22h-6%20w-6%22%7D"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="M18 17V9"></path>
                    <path d="M13 17V5"></path>
                    <path d="M8 17v-3"></path>
                  </svg>
                </div>
                <h2 className="title">{item}</h2>
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
                <Link
                  data-lov-id="src/pages/Index.tsx:128:16"
                  data-lov-name="Link"
                  data-component-path="src/pages/Index.tsx"
                  data-component-line="128"
                  data-component-file="Index.tsx"
                  data-component-name="Link"
                  data-component-content="%7B%22text%22%3A%22Learn%20more%22%2C%22className%22%3A%22inline-flex%20items-center%20text-sm%20font-medium%20text-primary%20transition-colors%22%7D"
                  className="item-link inline-flex items-center text-sm font-medium text-primary transition-colors"
                  to="/services#strategy-corporate-finance"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-arrow-up-right ml-1 h-4 w-4"
                    data-lov-id="src/pages/Index.tsx:135:18"
                    data-lov-name="ArrowUpRight"
                    data-component-path="src/pages/Index.tsx"
                    data-component-line="135"
                    data-component-file="Index.tsx"
                    data-component-name="ArrowUpRight"
                    data-component-content="%7B%22className%22%3A%22ml-1%20h-4%20w-4%22%7D"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </Link>
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
