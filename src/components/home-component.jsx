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
              <Link className="hmc-header-button" to="/about-us/our-story">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hmc-main">
        <div className="hmc-main-subcontainer">
          <div className="hmc-list-container">
            <div className="item hmc-bg-c shadow">
              <div className="title">Innovation</div>
              <div className="text">
                We integrate cutting-edge technology and modern methodologies to
                stay ahead in the industry.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">Quality</div>
              <div className="text">
                Precision and attention to detail are at the core of every
                project we undertake.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">Integrity</div>
              <div className="text">
                Transparency, honesty, and professionalism define our
                interactions with clients and partners.
              </div>
            </div>
            <div className="item hmc-bg-c shadow">
              <div className="title">Sustainability</div>
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
