import React, {createContext, useEffect, useState} from "react";
import "../css/components/blogs-component.css";
import InPageNavigation from "./inpage-navigation";
import axios from "axios";
import Preloader from "../common/preloader";
import BlogCard from "./blog-card";
import AnimationWrapper from "../common/page-animation";

export const FilterContext = createContext({});

const BlogsComponent = () => {
  const [filterVals, setFilterVals] = useState({tagsVal: [], dateVal: null});

  const [blogs, setBlogs] = useState(null);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [originalTrendings, setOriginalTrendings] = useState(null);
  const [trendings, setTrendings] = useState(null);

  const getLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
    .then ( (data) => {
      setBlogs(data.data.blogs);
      setOriginalBlogs(data.data.blogs);
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getLatestBlogs();
  }, []);


 const getTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
    .then ( (data) => {
      setTrendings(data.data.blogs);
      setOriginalTrendings(data.data.blogs);
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getLatestBlogs();
    getTrendingBlogs();
  }, []);

  useEffect(() => {console.log(trendings)}, [trendings]);


  return (
    <FilterContext.Provider value={{ originalBlogs, originalTrendings, blogs, setBlogs, trendings, setTrendings }}>
    <div className="bc-container mx-5 mt-3">
      <div className="bc-latest">

        <InPageNavigation routes = {["home", "trending"]}>
          <div className="ltbgs-container">

            <div className="ltbgs">
              { !blogs? <Preloader /> : <>
                {
                  blogs.map((blog, i) => {
                    return <AnimationWrapper transition = {{duration:1, delay:i*0.08}} key={i}>
                      <div className="blog-card-container">
                        <BlogCard blog={blog}/>
                      </div>
                    </AnimationWrapper>
                  })
                }
              </>}
            </div>
          </div>
          <div className="ltbgs-container">

            <div className="ltbgs">
              { !trendings? <Preloader /> : <>
                {
                  trendings.map((trending, i) => {
                    return <AnimationWrapper transition = {{duration:1, delay:i*0.08}} key={i}>
                      <div className="blog-card-container">
                        <BlogCard blog={trending}/>
                      </div>
                    </AnimationWrapper>
                  })
                }
              </>}
            </div>
          </div>
        </InPageNavigation>

      </div>

      <div className="bc-filters">
      </div>
    </div>
    </FilterContext.Provider>
  )
};

export default BlogsComponent;
