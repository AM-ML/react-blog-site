import React, {
  createContext,
  useEffect,
  useState,
  Suspense,
  lazy,
  useContext,
} from "react";
import "../css/components/blogs-component.css";
import InPageNavigation from "./inpage-navigation";
import axios from "axios";
import Preloader from "../common/preloader";
import filterPaginationData from "../common/pagination";
import LoadMoreBtn from "../common/load-more";
import Loading from "../common/loading";
import { UserContext } from "../Router";
import ScrollRevealWrapper from "../common/ScrollRevealWrapper";
import TrendingTimeFilter from "./trending-time-filter";

// Lazy loading components
const BlogCard = lazy(() => import("./blog-card"));

export const FilterContext = createContext({});

const BlogsComponent = () => {
  const { userAuth } = useContext(UserContext);
  const [blogs, setBlogs] = useState(null);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [originalTrendings, setOriginalTrendings] = useState(null);
  const [trendings, setTrendings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Separate state for "load more"
  const [trendingPeriod, setTrendingPeriod] = useState("week"); // Default trending period is "week"
  const [uDate, setuDate] = useState(null);
  const [uTags, setuTags] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);

  const getLatestBlogs = (page = 1, doCreate = false) => {
    if (page === 1) {
      setLoading(true); // Initial loading
    } else {
      setLoadingMore(true); // Loading more
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        date: uDate,
        tags: uTags,
        page,
        userId: userAuth?.id, // Send user ID to prioritize interests
      })
      .then(async ({ data: { blogs: newBlogs, totalDocs } }) => {
        console.log(uDate, uTags);
        console.log(newBlogs);
        let paginationData = await filterPaginationData({
          create_new_array: doCreate,
          current_data: blogs,
          new_data: newBlogs,
          page,
          totalDocs,
        });
        setBlogs(paginationData);
        setOriginalBlogs(paginationData);

        // Clear appropriate loading state
        if (page === 1) {
          if (trendings) setLoading(false);
        } else {
          setLoadingMore(false);
        }
      })
      .catch((err) => {
        if (page === 1) {
          if (trendings) setLoading(false);
        } else {
          setLoadingMore(false);
        }
        console.log(err);
      });
  };

  const getTrendingBlogs = (period = trendingPeriod) => {
    setTrendingLoading(true);
    if (!trendings && !blogs) {
      setLoading(true);
    }
    
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs", {
        period: period // Send the time period to the backend
      })
      .then((data) => {
        setTrendings(data.data.blogs);
        setOriginalTrendings(data.data.blogs);
        setTrendingLoading(false);
        if (!blogs) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setTrendingLoading(false);
        if (!blogs) {
          setLoading(false);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    getLatestBlogs();
    getTrendingBlogs();
  }, []);

  useEffect(() => {
    getLatestBlogs(1, true);
  }, [uDate, uTags]);

  // Handle trending period change
  const handleTrendingPeriodChange = (period) => {
    setTrendingPeriod(period);
    getTrendingBlogs(period);
  };

  const loadMore = () => {
    setLoadingMore(true); // Only set loadingMore, not main loading
    getLatestBlogs(blogs.page + 1);
  };

  const handleFilter = ({ tags, date }) => {
    if (!originalBlogs || !originalTrendings) return;

    setuDate(new Date(date));
    setuTags(tags.map((tag) => tag.toLowerCase()));

    let filteredTrendings = originalTrendings;

    if (date)
      filteredTrendings = filteredTrendings.filter((blog) => {
        const blogDate = new Date(blog.publishedAt);
        return blogDate > new Date(date);
      });
    if (tags.length)
      filteredTrendings = filteredTrendings.filter((blog) =>
        tags
          .map((tag) => tag.toLowerCase())
          .some((tag) => blog.tags.map((t) => t.toLowerCase()).includes(tag))
      );

    setTrendings(filteredTrendings);
  };

  return (
    <FilterContext.Provider
      value={{
        filterFunc: handleFilter,
        originalBlogs,
        originalTrendings,
        blogs,
        setBlogs,
        trendings,
        setTrendings,
      }}
    >
      {loading && <Preloader />}
      <main className="bc-container mt-3">
        <section className="bc-latest">
          <InPageNavigation
            blogs={originalBlogs}
            filterFunc={handleFilter}
            routes={["home", "trending"]}
          >
            <ScrollRevealWrapper animation="fade">
              <div className="ltbgs-container">
                <div className="ltbgs">
                  {!blogs ? (
                    <div className="w-100 d-flex justify-content-center">
                      <Loading height="40vh" />
                    </div>
                  ) : blogs.results.length ? (
                    <>
                      <Suspense
                        fallback={
                          <div className="w-100 d-flex justify-content-center">
                            <Loading height="40vh" />
                          </div>
                        }
                      >
                        {blogs.results.map((blog, i) => (
                          <article className="blog-card-container" key={i}>
                            <BlogCard
                              blog={blog}
                              addBorder={i + 1 !== blogs.results.length}
                              index={i}
                            />
                          </article>
                        ))}
                      </Suspense>
                    </>
                  ) : (
                    <p className="scc-no-data">No Blogs Found.</p>
                  )}
                </div>
                {blogs && blogs.totalDocs > blogs.results.length && (
                  <div className="w-100 d-flex justify-content-center">
                    {!loadingMore ? (
                      <LoadMoreBtn onClick={loadMore} />
                    ) : (
                      <Loading height="40vh" />
                    )}
                  </div>
                )}
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper animation="fade">
              <div className="ltbgs-container">
                {/* Add the trending time filter */}
                <TrendingTimeFilter 
                  onSelectPeriod={handleTrendingPeriodChange} 
                  initialPeriod={trendingPeriod}
                />
                
                <div className="ltbgs">
                  {trendingLoading ? (
                    <div className="w-100 d-flex justify-content-center">
                      <Loading height="40vh" />
                    </div>
                  ) : !trendings ? (
                    <div className="w-100 d-flex justify-content-center">
                      <Loading height="40vh" />
                    </div>
                  ) : trendings.length ? (
                    <>
                      <Suspense
                        fallback={
                          <div className="w-100 d-flex justify-content-center">
                            <Loading height="40vh" />
                          </div>
                        }
                      >
                        {trendings.map((trending, i) => {
                          if (trending.author?.personal_info?.name)
                            return (
                              <article className="blog-card-container" key={i}>
                                <BlogCard blog={trending} index={i} />
                              </article>
                            );
                        })}
                      </Suspense>
                    </>
                  ) : (
                    <p className="scc-no-data">No Trending Blogs Found.</p>
                  )}
                </div>
              </div>
            </ScrollRevealWrapper>
          </InPageNavigation>
        </section>
        <section className="bc-filters"></section>
      </main>
    </FilterContext.Provider>
  );
};

export default BlogsComponent;
