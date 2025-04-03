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

// Lazy loading components
const BlogCard = lazy(() => import("./blog-card"));
const AnimationWrapper = lazy(() => import("../common/page-animation"));

export const FilterContext = createContext({});

const BlogsComponent = () => {
  const { userAuth } = useContext(UserContext);
  const [blogs, setBlogs] = useState(null);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [originalTrendings, setOriginalTrendings] = useState(null);
  const [trendings, setTrendings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uDate, setuDate] = useState(null);
  const [uTags, setuTags] = useState([]);

  const getLatestBlogs = (page = 1, doCreate = false) => {
    if (blogs != null) setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        date: uDate,
        tags: uTags,
        page,
        userId: userAuth?.id // Send user ID to prioritize interests
      })
      .then(async ({ data: { blogs: newBlogs, totalDocs } }) => {
        let paginationData = await filterPaginationData({
          create_new_array: doCreate,
          current_data: blogs,
          new_data: newBlogs,
          page,
          totalDocs,
        });
        setBlogs(paginationData);
        setOriginalBlogs(paginationData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getTrendingBlogs = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then((data) => {
        setTrendings(data.data.blogs);
        setOriginalTrendings(data.data.blogs);
      })
      .catch((err) => {
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

  const loadMore = () => {
    setLoading(true);
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
                    <Preloader />
                  ) : blogs.results.length ? (
                    <>
                      <Suspense fallback={<Preloader />}>
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
                {!loading ? (
                  blogs && blogs.totalDocs > blogs.results.length ? (
                    <LoadMoreBtn onClick={loadMore} />
                  ) : (
                    ""
                  )
                ) : (
                  <Loading height="40vh" />
                )}
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper animation="fade">
              <div className="ltbgs-container">
                <div className="ltbgs">
                  {!trendings ? (
                    <Preloader />
                  ) : trendings.length ? (
                    <>
                      <Suspense fallback={<Preloader />}>
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
                    <p className="scc-no-data">No Blogs Found.</p>
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
