import "../css/components/home-component.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../common/loading";
import AnimationWrapper from "../common/page-animation";
import cachedBlogsData from "./json/home-component-blogs-data.json";
import headerImage from "../assets/home/header5.webp"; // Import the image directly
import { ChevronDown, ArrowRight } from "lucide-react";

// Lazy load the BlogCard component
const BlogCard = lazy(() => import("../common/blogPreviewLG.jsx"));

const HomeComponent = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload critical images
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = headerImage;
    document.head.appendChild(link);

    const loadLatestBlogs = async () => {
      try {
        // Use cached data if available to improve performance
        if (cachedBlogsData && cachedBlogsData.blogs) {
          setLatestBlogs(cachedBlogsData.blogs);
          setLoading(false);
          return;
        }

        // Fallback to API call if cache is not available
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",
          {
            limit: 3,
            page: 1,
            sort: { publishedAt: -1 },
          }
        );
        setLatestBlogs(data.blogs);
      } catch (error) {
        console.error("Error loading latest blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    // Use requestIdleCallback for non-critical operations
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => loadLatestBlogs());
    } else {
      setTimeout(loadLatestBlogs, 100);
    }
  }, []);

  return (
    <div className="hmc-container">
      <header className="hmc-header">
        {/* Replace background image with proper <img> element for better LCP tracking */}
        <div className="layer-img">
          <div className="shadow-overlay"></div>
          <img
            src={headerImage}
            alt="BOFFO Consulting Group header image"
            loading="eager"
            fetchpriority="high"
            width="1920"
            height="1080"
            className="header-img"
          />
        </div>
        <div className="hmc-info">
          <div className="hmc-text">
            <h1 className="title">BOFFO Consulting Group</h1>
            <p className="desc">"Consulting for Excellence"</p>
            <nav className="hmc-links">
              <Link to="/contact-us" className="srf-learn-more hmc-btn">
                Join Us
                <ArrowRight className="srf-btn-icon" size={16} />
                <span className="srf-btn-bg"></span>
              </Link>
              <Link to="/about-us/our-story" className="srf-learn-more hmc-btn">
                Our Story
                <ArrowRight className="srf-btn-icon" size={16} />
                <span className="srf-btn-bg"></span>
              </Link>
            </nav>
          </div>
        </div>
        <a href="#main" className="h-arrow-c">
          <ChevronDown className="h-arrow" size={72} />
        </a>
      </header>

      <main id="main" className="hmc-main">
        <section className="hmc-list-section">
          <span className="hmc-list-title">OUR CORE VALUES</span>
          <h2 className="hmc-list-header">
            Expert solutions for complex challenges
          </h2>
          <div className="hmc-list-desc">
            We partner with organizations to drive lasting improvement in
            performance and build capabilities that help them succeed.
          </div>
          <div className="hmc-list-container">
            {[
              "Strategy & Corporate Finance",
              "Innovation",
              "Quality",
              "Client-Centric Approach",
              "Sustainability",
              "Expertise",
            ].map((item, i) => (
              <div key={i} className="item hmc-bg-c">
                <div className="p-3 bg-gray-50 rounded-full w-fit mb-6 item-icon">
                  {
                    [
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chart-column h-6 w-6"
                      >
                        <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                        <path d="M18 17V9"></path>
                        <path d="M13 17V5"></path>
                        <path d="M8 17v-3"></path>
                      </svg>,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lightbulb h-6 w-6"
                      >
                        <path d="M9 18h6"></path>
                        <path d="M10 22h4"></path>
                        <path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.2 4.8-3 6.3a2 2 0 0 0-.7 1.5v1H9v-1a2 2 0 0 0-.7-1.5C6.2 13.8 5 11.6 5 9a7 7 0 0 1 7-7z"></path>
                      </svg>,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10"
                          stroke="#323232"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2.293,21.707a1,1,0,0,0,1.414,0l3.051-3.051a9.821,9.821,0,0,0,4.261,1.014,9.2,9.2,0,0,0,6.638-2.964C23,11.361,21.936,3.3,21.888,2.963a1,1,0,0,0-.851-.851C20.7,2.063,12.638,1,7.294,6.344a9.091,9.091,0,0,0-1.95,10.9L2.293,20.293A1,1,0,0,0,2.293,21.707ZM8.708,7.758c3.733-3.733,9.236-3.839,11.264-3.73.106,2.029,0,7.531-3.729,11.264a7.063,7.063,0,0,1-7.984,1.863l4.4-4.4a1,1,0,1,0-1.414-1.414l-4.4,4.4A7.063,7.063,0,0,1,8.708,7.758Z" />
                      </svg>,
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        height="24"
                        width="24"
                        version="1.1"
                        id="_x31_"
                        viewBox="0 0 128 128"
                      >
                        <path
                          id="_x32__26_"
                          d="M120.9,32.6c-1.4-2.7-3.1-4.6-5.1-5.7c-0.1-2.9-1.4-5.3-3.5-7.4c-2.5-2.5-5.8-3.8-9.4-3.8  C98.8,10.9,88.8,8,80.5,9.3c-4.1-2-9.4-1.9-13-1.9c-0.5,0-0.9,0-1.4,0h-0.5c-4.3,0-11.8-0.1-15.9,3.5c-4-1.6-10.3-0.9-15.4,0.6  c-6.3,2-10.7,5.1-12.3,8.8c-4.1,1-9.3,4.7-12.4,9.2C7.2,33,4.9,38.3,7,44.9c-2.4,6.2-1.1,12.9,3.5,18.2c4.7,5.5,11.8,7.9,18.1,6.2  c3.5,0.4,6.1,0.2,7.9-0.2c0.4,3.1,1.6,7.1,5.1,9.9c1.4,3.2,4.1,5.6,7.6,6.6c4,1.1,8.4,0.4,11.7-1.9c1.2-0.1,2.6-0.2,4.1-0.5  c-0.2,2.5,0,4.8,0.6,6.8c0.2,2.1,2.1,13.4,13.3,18.8c11.4,5.5,10.9,8.8,10.9,9.8c0,3.3,3.8,5.2,7.6,5.3c0.1,0,0.2,0,0.5,0  c3.8,0,6.6-2.1,6.8-5.2c0.5-6.6-0.6-7.8-5.4-13.4c-1.6-1.9-2.6-5.2-3.2-7.4c2.2-0.5,4.2-1.2,6.1-2.2c2.9,0,5.7-1.1,7.8-3.2  c2.1-2.1,3.3-4.7,3.5-7.7c6.8-4.7,10.2-15.2,8.2-25.8C124.9,51.6,124.5,39.9,120.9,32.6z M110,81.1c-0.9,0.5-1.4,1.4-1.2,2.2  c0.1,2.1-0.6,4.1-2,5.5c-1.2,1.2-2.9,1.9-4.5,1.9c-6.6-2.5-6.3-7.8-6.2-8.4c0.1-1.4-0.9-2.6-2.2-2.7s-2.6,0.9-2.7,2.2  c-0.4,2.6,0.5,7.6,5,11.2c-3.1,0.9-7.1,1.2-12.4,1.2c-6,0-10-1.2-12-3.8c-1.5-1.9-1.9-4.6-1.2-7.9c7.3-1.4,9.7,2,9.8,2.2  c0.5,0.7,1.2,1.2,2.1,1.2c0.4,0,0.9-0.1,1.2-0.4c1.2-0.6,1.6-2.2,1-3.3c-0.1-0.2-4.3-7.2-16.6-4.3l0,0c-2.5,0.5-4.7,0.7-6.6,0.9  c-5.3-6.3-1.5-10.8-1-11.3c1-1,0.9-2.6-0.1-3.5c-1-1-2.6-0.9-3.5,0c-2.6,2.6-5.5,9.3-0.2,16.6c-1.7,0.6-3.8,0.7-5.6,0.2  c-1.6-0.5-3.6-1.5-4.6-4.2c-0.1-0.5-0.5-0.9-0.9-1.1c-4.5-3.3-3.8-9.4-3.7-10.4c0.9-2.5,3.6-8.1,11.3-10.3c3.5-1,6.3-0.4,9.8,0.2  c1,0.2,2.1,0.4,3.2,0.6c1.2,8.9,10.7,12.3,11,12.5c0.2,0.1,0.5,0.1,0.9,0.1c1,0,2-0.6,2.4-1.6c0.5-1.2-0.2-2.7-1.5-3.1  c-0.1,0-6.1-2.2-7.6-7.4c8.2-0.2,11.2-6.4,11.5-9.8c0.1-1.4-0.7-2.6-2.1-2.7s-2.6,0.7-2.7,2.1c-0.1,0.5-1,5.5-7.2,5.5  c-2.5,0-4.7-0.5-6.8-0.9c-3.7-0.7-7.6-1.5-12.1-0.1c-5.7,1.6-9.3,4.8-11.5,7.8c-1.6-2.2-4-3.6-6-4.7c-1.4-0.7-2.7-1.5-3.6-2.5  c-2.2-2.2,0.4-6.8,0.4-6.8c0.7-1.1,0.4-2.7-0.9-3.3c-1.5-1.1-3-0.7-3.7,0.5c-1.7,3-3.7,8.9,0.4,13c1.4,1.4,3.1,2.4,4.7,3.2  c3.3,1.9,5.2,3.1,5.2,6.3c-0.6,0.4-2.5,1.4-7.9,0.7c-0.4,0-0.6,0-1,0.1c-4.6,1.4-9.8-0.5-13.5-4.6c-3.6-4.1-4.5-9.3-2.4-13.9  c0.2-0.6,0.2-1.2,0-1.9c-1.9-5-0.1-9.1,1.7-11.8c1.6-2.4,3.8-4.2,5.7-5.5c0.6,0.4,1.2,0.5,2,0.4c6.3-1.6,10.5,5.7,10.8,6.1  c0.5,0.9,1.2,1.2,2.1,1.2c0.4,0,0.9-0.1,1.2-0.4c1.2-0.6,1.6-2.2,1-3.3c-0.2-0.4-3.7-6.6-9.9-8.4c0.9-2.4,4.3-4.7,9.3-6.2  c6.4-2,11.5-1.5,12.6-0.6c3.8,5.5,1.5,8.6-1.5,12.5c-0.6,0.9-1.2,1.6-1.9,2.5c-5,7.4-1.4,13,1.4,15c0.5,0.4,1,0.5,1.5,0.5  c0.7,0,1.5-0.4,2-1c0.9-1.1,0.6-2.6-0.5-3.5c-0.6-0.5-3.6-3.2-0.1-8.3c0.5-0.7,1.1-1.5,1.6-2.2c2.9-3.7,7.2-9.2,2.6-16.9  c2.9-2,9.4-2,12.1-1.9h0.5c0.4,0,0.9,0,1.4,0c3.3,0,8.4,0,11.4,1.6c0.5,0.2,1.1,0.4,1.7,0.2C88,12.7,96,15.5,99,18.3  c-1.4,2.7-3.7,8.8-2.4,14.5c1.5,6.7,1.7,8.4-3.7,10.4c-1.2,0.5-2,1.9-1.5,3.2c0.4,1,1.4,1.6,2.4,1.6c0.2,0,0.6,0,0.9-0.1  c3.6-1.4,5.7-3.1,6.8-5.1c0.6,0.2,1,0.6,1.4,1.1c1.7,2.2,1.5,6.3,1.4,7.7c-0.2,1.4,0.7,2.6,2.1,2.9c0.1,0,0.2,0,0.4,0  c1.2,0,2.2-0.9,2.5-2.1c0.1-0.7,1-7.2-2.4-11.5c-1.1-1.5-2.6-2.5-4.3-3.1c-0.1-2-0.5-4.1-1-6.2c-1-4.3,1-9.2,2-11.3  c2.2,0.1,4.2,1,5.7,2.4c1.5,1.5,2.1,3.5,2,5.5c-0.1,1.2,0.7,2.5,2,2.7c1.2,0.2,2.6,1.6,3.6,3.7c2.9,5.8,3.2,15.9,0.9,21.8  c0,0.1-0.1,0.1-0.1,0.1c-2.2,3.2-5.1,3.3-9.9,3.3c-1.6,0-3.1,0-4.8,0.1c-7.6,0.7-11.2,8.3-11.3,8.7c-0.6,1.2,0,2.7,1.2,3.3  c0.4,0.1,0.7,0.2,1,0.2c1,0,1.9-0.5,2.2-1.5c0,0,2.6-5.3,7.3-5.8c1.4-0.1,2.9-0.1,4.3-0.1c3.3,0,6.9,0,10-1.7  C117.8,71.1,115,78.3,110,81.1z"
                        />
                        <path
                          id="_x31__26_"
                          d="M73.9,26.9c0.2-2.6-0.2-4.8-0.2-5.1c-0.2-1.4-1.6-2.1-3-1.9s-2.1,1.6-1.9,3c0,0,1.1,5.5-1.7,7.3  c-0.5,0.2-1,0.6-1.5,0.9c-4.1,2.5-8.8,5.2-7.7,11.5c0.2,1.2,1.2,2.1,2.5,2.1c0.1,0,0.2,0,0.5,0c1.4-0.2,2.2-1.5,2-2.9  c-0.5-2.7,1-3.8,5.3-6.4c0.5-0.2,1-0.6,1.5-0.9c1.1-0.6,1.9-1.5,2.5-2.4c7.1-1.2,10.8,4.5,10.9,4.7c0.5,0.7,1.2,1.1,2.1,1.1  c0.5,0,0.9-0.1,1.2-0.4c1.1-0.7,1.5-2.2,0.9-3.5C85.6,31.4,80.8,26.9,73.9,26.9z"
                        />
                      </svg>,
                    ][i]
                  }
                </div>
                <h2 className="title">{item}</h2>
                <p className="text">
                  {
                    [
                      "We integrate cutting-edge technology and modern methodologies to stay ahead in the industry.",
                      "Precision and attention to detail are at the core of every project we undertake.",
                      "Transparency, honesty, and professionalism define our interactions with clients and partners.",
                      "Your vision is our priority. We collaborate closely to ensure exceptional results that exceed expectations.",
                      "We implement eco-friendly and sustainable practices to minimize environmental impact.",
                      "Our experienced team delivers reliable and effective solutions for every project.",
                    ][i]
                  }
                </p>
                <Link
                  className="item-link inline-flex items-center text-sm font-medium text-primary transition-colors"
                  to={
                    ["/about-us/overview", "/about-us/sustainability"][
                      i === 4 ? 1 : 0
                    ]
                  }
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right ml-1 h-4 w-4"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="hmc-bps-section">
          <span className="hmc-list-title hmc-bps-title">
            FEATURED INSIGHTS
          </span>
          <h2 className="hmc-list-header hmc-bps-header">
            Our latest thinking on business and management
          </h2>
          <div className="hmc-list-desc hmc-bps-desc">
            Explore our featured insights to help you achieve distinctive,
            lasting, and substantial performance improvements.
          </div>

          {/* Defer loading of blogs section */}
          <div className="hmc-bps">
            {loading ? (
              <Loading height="30vh" />
            ) : (
              latestBlogs.map((blog, i) => (
                <AnimationWrapper
                  transition={{ duration: 1, delay: i * 0.01 }}
                  key={blog._id}
                >
                  <div className="hmc-bp-container">
                    <Suspense
                      fallback={
                        <div className="blog-placeholder">
                          Loading blog content...
                        </div>
                      }
                    >
                      <BlogCard blog={blog} />
                    </Suspense>
                  </div>
                </AnimationWrapper>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeComponent;
