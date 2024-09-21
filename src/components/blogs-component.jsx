import React, { createContext, useEffect, useState } from "react";
import "../css/components/blogs-component.css";
import InPageNavigation from "./inpage-navigation";
import axios from "axios";
import Preloader from "../common/preloader";
import BlogCard from "./blog-card";
import AnimationWrapper from "../common/page-animation";
import NoData from "../common/nodata";
import filterPaginationData from "../common/pagination";
import LoadMoreBtn from "../common/load-more";
import Loading from "../common/loading";
import EndOfData from "../common/end-of-data";

export const FilterContext = createContext({});

const BlogsComponent = () => {
  const [blogs, setBlogs] = useState(null);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [originalTrendings, setOriginalTrendings] = useState(null);
  const [trendings, setTrendings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uDate, setuDate] = useState(null);
  const [uTags, setuTags] = useState([]);

  const getLatestBlogs = (page = 1, doCreate = false) => {
    if (blogs != null) setLoading(true);
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
      date: uDate,
      tags: uTags,
      page
    })
      .then(async ({ data: { blogs: newBlogs, totalDocs } }) => {
        // Ensure the blogs state has a proper initial structure
        let paginationData = await filterPaginationData({
          create_new_array: doCreate,
          current_data: blogs,
          new_data: newBlogs,
          page,
          totalDocs
        });
        setBlogs(paginationData);
        setOriginalBlogs(paginationData);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const getTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then((data) => {
        setTrendings(data.data.blogs);
        setOriginalTrendings(data.data.blogs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLatestBlogs();
    getTrendingBlogs();
  }, []);

  useEffect(() => {
      getLatestBlogs(1, true);
    console.log(blogs);
  }, [uDate, uTags]);

  const loadMore = () => {
    setLoading(true);
    getLatestBlogs(blogs.page + 1);
  };

  const handleFilter = ({ tags, date }) => {
    if (!originalBlogs || !originalTrendings) return;

    setuDate(new Date(date));
    setuTags(tags.map(tag => tag.toLowerCase()));

    let filteredTrendings = originalTrendings;

    if (date)
      filteredTrendings = filteredTrendings.filter(blog => {
        const blogDate = new Date(blog.publishedAt);
        return blogDate > new Date(date);
      });
    if( tags.length )
      filteredTrendings = filteredTrendings.filter(blog =>
        tags.map(tag => tag.toLowerCase()).some(tag => blog.tags.map(t => t.toLowerCase()).includes(tag))
      );

    setTrendings(filteredTrendings);
  };

  return (
    <FilterContext.Provider value={{ filterFunc: handleFilter, originalBlogs, originalTrendings, blogs, setBlogs, trendings, setTrendings }}>
      <div className="bc-container mx-5 mt-3">
        <div className="bc-latest">
          <InPageNavigation blogs={originalBlogs} filterFunc = {handleFilter} routes={["home", "trending"]}>
            <div className="ltbgs-container">
              <div className="ltbgs">
                {!blogs ? <Preloader /> : blogs.results.length ? <>
                  {
                    blogs.results.map((blog, i) => {
                      return <AnimationWrapper transition={{ duration: 1, delay: (i%10) * 0.08 }} key={i}>
                        <div className="blog-card-container">
                          <BlogCard blog={blog} addBorder={i + 1 != blogs.results.length} />
                        </div>
                      </AnimationWrapper>
                    })
                  }
                </> : <NoData msg="No Matching Blogs Found." addBtn={false} />}
              </div>
              {!loading ? blogs && blogs.totalDocs > blogs.results.length?
                <LoadMoreBtn onClick={loadMore} />: <EndOfData />
                :
                <Loading height="40vh" />}
            </div>
            <div className="ltbgs-container">
              <div className="ltbgs">
                {!trendings ? <Preloader /> : trendings.length ? <>
                  {
                    trendings.map((trending, i) => {
                      return <AnimationWrapper transition={{ duration: 1, delay: i * 0.08 }} key={i}>
                        <div className="blog-card-container">
                          <BlogCard blog={trending} />
                        </div>
                      </AnimationWrapper>
                    })
                  }
                </> : <NoData addBtn={false} msg="No Matching Blogs Found." />}
              </div>
            </div>
          </InPageNavigation>
        </div>
        <div className="bc-filters">
        </div>
      </div>
    </FilterContext.Provider>
  );
};

export default BlogsComponent;

