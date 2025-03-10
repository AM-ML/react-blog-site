import "../css/components/home-component.css";
import image from "../assets/home/hmfw.webp";
import robot_img from "../assets/projects/home1.webp";
import AnimationWrapper from "../common/page-animation.jsx";
import BlogCard from "../common/blogPreviewLG.jsx";
import Slideshow from "./slideshow";
import blogsData from "./json/home-component-blogs-data.json"; // Importing pre-fetched blog data
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="hmc-container">
      <div className="hmc-header row">
        <div className="hmc-col hmc-header-images">
          <img src={image} alt="" />
        </div>
        <div className="ms-auto hmc-col hmc-header-text">
          <p className="hmc-header-title">
            Innovative Solutions for the Modern Marketplace
          </p>
          <p className="hmc-header-paragraph">
            In an ever-evolving marketplace, staying ahead requires more than
            just keeping up. We provide cutting-edge solutions tailored to your
            unique business challenges, harnessing deep industry insights and
            advanced analytics.
          </p>
          <div className="hmc-header-button-container row">
            <div className="col">
              <Link className="hmc-header-button" to="/contact-us">
                Join Us
              </Link>
            </div>
            <div className="col">
              <Link className="hmc-header-button" to="/case-studies">
                Our Impact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hmc-main">
        <div className="hmc-main-subcontainer">
          <div className="hmc-sns-container">
            <div className="hmc-slider-container">
              <h3 className="hmc-slider-title">BOFFO Projects</h3>
              <Slideshow />
            </div>
            <div className="hmc-stat-container">
              <p className="hmc-stat-txt hmc-stat-item">
                Boffo Consulting Group is a leading force in engineering,
                construction, and architectural consulting, delivering
                innovative solutions across diverse projects. From large-scale
                infrastructure developments to high-end commercial and
                residential designs, our expertise drives excellence at every
                stage. We have contributed to landmark projects, including urban
                master plans, state-of-the-art industrial facilities, and
                sustainable building initiatives.
                <br />
                <br />
                Our team collaborates with industry leaders to optimize
                structural integrity, efficiency, and aesthetics, ensuring every
                project meets the highest standards. At Boffo Consulting Group,
                we transform visions into reality with precision, innovation,
                and a commitment to excellence.
              </p>
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
                  <u>Contact us.</u> Your success is our foundation.
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
