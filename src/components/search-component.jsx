import AnimationWrapper from "../common/page-animation";
import "../css/components/search-component.css";
import InPageNavigation from "./inpage-navigation";
import axios from "axios";
import BlogCard from "./blog-card.jsx";
import Loading from "../common/loading.jsx";
import EndOfData from "../common/end-of-data.jsx";
import { useEffect, useState, useRef } from "react";
import filterPaginationData from "../common/pagination";
import Preloader from "../common/preloader";
import { useNavigate } from "react-router-dom";
import AuthorCard from "./author-card.jsx";

const SearchComponent = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [bigLoading, setBigLoading] = useState(true);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [uDate, setuDate] = useState(null);
  const [uTags, setuTags] = useState([]);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [loadingRandomBlogs, setLoadingRandomBlogs] = useState(false);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Ref for intersection observer
  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);

  const getLatestBlogs = (page = 1, doCreate = false, bigLoad = false) => {
    if (blogs != null) bigLoad ? setBigLoading(true) : setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        date: uDate,
        tags: uTags,
        page,
        query,
      })
      .then(async ({ data: { blogs: newBlogs, totalDocs } }) => {
        // Ensure the blogs state has a proper initial structure
        let paginationData = await filterPaginationData({
          create_new_array: doCreate,
          current_data: blogs,
          new_data: newBlogs,
          page,
          totalDocs,
        });
        setBlogs(paginationData);
        setOriginalBlogs(paginationData);
        bigLoad ? setBigLoading(false) : setLoading(false);
        
        // Check if we've loaded all results
        if (paginationData.results.length >= totalDocs) {
          setAllResultsLoaded(true);
          // Load random blogs when search results are exhausted
          getRandomBlogs(paginationData.results.map(blog => blog.blog_id));
        } else {
          setAllResultsLoaded(false);
        }
      })
      .catch((err) => {
        bigLoad ? setBigLoading(false) : setLoading(false);
        console.log(err);
      });
  };
  
  const getRandomBlogs = (excludeIds = []) => {
    // Only fetch random blogs if we've exhausted search results
    if (!loadingRandomBlogs) {
      setLoadingRandomBlogs(true);
      
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/random-blogs", {
          excludeIds,
          limit: 5
        })
        .then(({ data }) => {
          setRandomBlogs(data.blogs || []);
          setLoadingRandomBlogs(false);
        })
        .catch(err => {
          console.error("Error fetching random blogs:", err);
          setLoadingRandomBlogs(false);
        });
    }
  };

  const loadMore = () => {
    if (blogs?.page < Math.ceil(blogs?.totalDocs / 10)) {
      getLatestBlogs(blogs.page + 1, false);
    }
  };

  const handleFilter = ({ tags, date }) => {
    console.log("filter received:", tags, date);
    setuDate(date);
    setuTags(tags);
  };

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    // Clean up old observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Handler for when the loading element becomes visible
    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && blogs && blogs.totalDocs > blogs.results.length) {
        loadMore();
      }
    };

    // Create new observer
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 400px 0px', // Load more content before user reaches the end
      threshold: 0.1,
    });

    // Observe the loading element if it exists
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [blogs, loading]);

  useEffect(() => {
    getLatestBlogs(1, true);
  }, [query, uDate, uTags]);

  return (
    <div className="scc-container">
      {bigLoading && <Preloader />}
      <div className="scc-results-container">
        <InPageNavigation
          routes={[
            `${
              window.innerWidth >= 768
                ? `Search Results for - ${query}`
                : "Results"
            }`,
          ]}
          filterFunc={handleFilter}
          blogs={originalBlogs}
        >
          <div className="ltbgs-container">
            <div className="ltbgs">
              {blogs && blogs.results.length === 0 ? (
                <p className="scc-no-data">No Blogs Found.</p>
              ) : (
                <>
                  {blogs &&
                    blogs.results.map((blog, i) => (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: (i % 10) * 0.08 }}
                        key={i}
                      >
                        <div className="blog-card-container">
                          <BlogCard
                            blog={blog}
                            addBorder={i + 1 !== blogs.results.length}
                          />
                        </div>
                      </AnimationWrapper>
                    ))}
                </>
              )}
            </div>

            {/* Infinite scroll loading indicator */}
            {!loading ? (
              blogs && blogs.totalDocs > blogs.results.length ? (
                <div ref={loadMoreRef} className="w-100 d-flex justify-content-center">
                  {/* This element is just a marker for the intersection observer */}
                </div>
              ) : (
                blogs && blogs.results.length > 0 && allResultsLoaded && (
                  <>
                    <EndOfData />
                    
                    {/* Random blogs section */}
                    {randomBlogs.length > 0 && (
                      <div className="random-blogs-section">
                        <h2 className="random-blogs-title">You might also like</h2>
                        <div className="ltbgs">
                          {randomBlogs.map((blog, i) => (
                            <AnimationWrapper
                              transition={{ duration: 1, delay: i * 0.08 }}
                              key={i}
                            >
                              <div className="blog-card-container">
                                <BlogCard
                                  blog={blog}
                                  addBorder={i + 1 !== randomBlogs.length}
                                />
                              </div>
                            </AnimationWrapper>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {loadingRandomBlogs && (
                      <div className="w-100 d-flex justify-content-center">
                        <Loading height="20vh" />
                      </div>
                    )}
                  </>
                )
              )
            ) : (
              <div className="w-100 d-flex justify-content-center">
                <Loading height="40vh" />
              </div>
            )}
          </div>
        </InPageNavigation>
      </div>
    </div>
  );
};

export default SearchComponent;

