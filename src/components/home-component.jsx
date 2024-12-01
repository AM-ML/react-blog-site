import { useState, useEffect } from "react";
import "../css/components/home-component.css";
import image from "../assets/home/stock_2.png";
import AnimationWrapper from "../common/page-animation.jsx";
import BlogCard from "../common/blogPreviewLG.jsx";
import axios from "axios";
import Loading from "../common/loading";
import SliderC from "./slider-component";
import Slideshow from "./slideshow";

const HomeComponent = () => {
  const [blogsData, setBlogsData] = useState([]); // State to hold the blog data
  const [loading, setLoading] = useState(true);
  const blogs = [
    "9-Iconic-Chess-Photoss9bBVseJ3A2vW-8yV0eb7",
    "AI-for-small-businesses-Tools-StrategiesaW8yawlV8Rl92EvqtD_c0",
    "Before-Vishy-Vs-The-World-There-Was-Kasparov-Vs-The-WorldSiNIDHlpMRx_sbFK2Dqxz",
  ]; // Your blog IDs

  const sliderImgs = [
    "http://res.cloudinary.com/dlhedrwu6/image/upload/v1725794281/AZcIILKcSBGEEyEU2VmZ5-1725794280568.jpg",
    "http://res.cloudinary.com/dlhedrwu6/image/upload/v1727176762/EHhtN-R2K9E8jkwBSWiSx-1727176756606.jpg",
    "http://res.cloudinary.com/dlhedrwu6/image/upload/v1725794637/aJJCNv1eaX0YVagrYGTrm-1725794636652.jpg",
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const fetchedBlogs = await Promise.all(
          blogs.map((blog_id) =>
            axios
              .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
                blog_id,
                incrementVal: 0,
              })
              .then(({ data: { blog } }) => blog)
              .catch((err) => {
                console.error("Error fetching blog:", err);
                return null; // Return null or handle error if necessary
              })
          )
        );
        // Filter out any failed responses (null values)
        const validBlogs = fetchedBlogs.filter((blog) => blog !== null);
        setBlogsData(validBlogs); // Set state only once after all blogs are fetched
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Run only once when the component mounts

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
              <button className="hmc-header-button">Join Us</button>
            </div>
            <div className="col">
              <button className="hmc-header-button">Our Impact</button>
            </div>
          </div>
        </div>
      </div>

      {loading == true ? (
        <Loading />
      ) : (
        <div className="hmc-main">
          <div className="hmc-slider-container">
            <h3 className="hmc-slider-title">BOFFO Projects</h3>
            <Slideshow />
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
                    aligned={(i + 1) % 2 == 0 ? "right" : "left"}
                  />
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
