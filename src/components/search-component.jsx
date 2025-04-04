import AnimationWrapper from "../common/page-animation";
import "../css/components/search-component.css";
import InPageNavigation from "./inpage-navigation";
import axios from "axios";
import BlogCard from "./blog-card.jsx";
import Loading from "../common/loading.jsx";
import EndOfData from "../common/end-of-data.jsx";
import {useEffect, useState} from "react";
import LoadMoreBtn from "../common/load-more";
import filterPaginationData from "../common/pagination";
import Preloader from "../common/preloader";
import {useNavigate} from "react-router-dom";
import AuthorCard from "./author-card.jsx";

const SearchComponent = ({ query } ) => {
  const [loading, setLoading] = useState(false);
  const [bigLoading, setBigLoading] = useState(true);
  const [originalBlogs, setOriginalBlogs] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [uDate, setuDate] = useState(null);
  const [uTags, setuTags] = useState([]);
  const navigate = useNavigate();


  const getLatestBlogs = (page = 1, doCreate = false, bigLoad=false) => {
    if (blogs != null) (bigLoad? setBigLoading(true) : setLoading(true));
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
      date: uDate,
      tags: uTags,
      page,
      query
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
        bigLoad? setBigLoading(false) : setLoading(false);
      })
      .catch(err => {
        bigLoad? setBigLoading(false) : setLoading(false);
        console.log(err);
      });
  };

  const getAuthors = ({page = 1, doCreate = false, bigLoad=false}) => {
    if (authors != null) { bigLoad? setBigLoading(true) : setLoading(true)};
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-authors", {
      page,
      query
    })
      .then(async ({ data: { authors: newAuthors, totalDocs } }) => {
        // Ensure the blogs state has a proper initial structure
        let paginationData = await filterPaginationData({
          create_new_array: doCreate,
          current_data: authors,
          new_data: newAuthors,
          page,
          totalDocs
        });
        setAuthors(paginationData);
        bigLoad? setBigLoading(false) : setLoading(false);
      })
      .catch(err => {
        bigLoad? setBigLoading(false) : setLoading(false);
        console.log(err);
      });

  }


  const handleFilter = ({ tags, date }) => {
    if (!originalBlogs) return;
    setuDate(new Date(date));
    setuTags(tags.map(tag => tag.toLowerCase()));
  };


  const loadMore = () => {
    setLoading(true);
    getLatestBlogs(blogs.page + 1);
  };

  const loadMoreAuthors = () => {
    setLoading(true);
    getAuthors({page: authors.page + 1, doCreate: false, bigLoad: false });
  };

  const resetData = () => {
    setBlogs(null);setOriginalBlogs(null);setAuthors(null);
  }

  useEffect(() => {
    resetData();
    setBigLoading(true);
    
    // Start a timestamp to ensure minimum loading time for better UX
    const loadingStartTime = Date.now();
    const minimumLoadingTime = 1500; // 1.5 seconds minimum
    
    // Track completion of both data fetches
    let blogsLoaded = false;
    let authorsLoaded = false;
    
    // Function to check if we can complete loading
    const checkLoading = () => {
      if (blogsLoaded && authorsLoaded) {
        const timeElapsed = Date.now() - loadingStartTime;
        if (timeElapsed < minimumLoadingTime) {
          setTimeout(() => {
            setBigLoading(false);
          }, minimumLoadingTime - timeElapsed);
        } else {
          setBigLoading(false);
        }
      }
    };
    
    // Modified data fetch functions with completion tracking
    const fetchBlogs = () => {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        date: uDate,
        tags: uTags,
        page: 1,
        query
      })
        .then(async ({ data: { blogs: newBlogs, totalDocs } }) => {
          let paginationData = await filterPaginationData({
            create_new_array: true,
            current_data: null,
            new_data: newBlogs,
            page: 1,
            totalDocs
          });
          setBlogs(paginationData);
          setOriginalBlogs(paginationData);
          blogsLoaded = true;
          checkLoading();
        })
        .catch(err => {
          console.log(err);
          blogsLoaded = true;
          checkLoading();
        });
    };
    
    const fetchAuthors = () => {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-authors", {
        page: 1,
        query
      })
        .then(async ({ data: { authors: newAuthors, totalDocs } }) => {
          let paginationData = await filterPaginationData({
            create_new_array: true,
            current_data: null,
            new_data: newAuthors,
            page: 1,
            totalDocs
          });
          setAuthors(paginationData);
          authorsLoaded = true;
          checkLoading();
        })
        .catch(err => {
          console.log(err);
          authorsLoaded = true;
          checkLoading();
        });
    };
    
    // Start both fetches
    fetchBlogs();
    fetchAuthors();
    
  }, [query]);

  useEffect(() => {getLatestBlogs(1, true);}, [uDate, uTags]);
  return (
    <div className="scc-container">
      {bigLoading && <Preloader />}
      <div className="scc-results-container">
        <InPageNavigation
          routes={[`${ window.innerWidth >= 768 ? `Search Results for - ${query}`: 'Results'}`, "Authors"]}
          filterFunc={handleFilter}
          blogs = {originalBlogs}
        >

        <div className="ltbgs-container">
         <div className="ltbgs">
            {blogs && blogs.results.length === 0 ? (
              <p className="scc-no-data">No Blogs Found.</p>
            ) : (
                <>
                  {blogs && blogs.results.map((blog, i) => (
                    <AnimationWrapper transition={{ duration: 1, delay: (i%10) * 0.08 }} key={i}>
                      <div className="blog-card-container">
                        <BlogCard blog={blog} addBorder={i + 1 !== blogs.results.length} />
                      </div>
                    </AnimationWrapper>
                  ))}
                </>
              )}
          </div>
          {!loading ? (
            blogs && blogs.totalDocs > blogs.results.length ? (
              <LoadMoreBtn onClick={loadMore} />
            ) : (
                blogs && blogs.results.length > 0 && <EndOfData />
              )
          ) : (
              <Loading height="40vh" />
            )}

        </div>

          <div className="scc-auths-container">
            { authors && authors.results.length === 0 ? (
              <p className="scc-no-data">No Authors Found.</p>
              ) : (
                  authors && authors.results.map((author, i) => (
                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.08 }} key={i}>
                      <div className="scc-auth-card-container">
                        <AuthorCard author={author} addBorder={i + 1 !== authors.results.length} />
                      </div>
                    </AnimationWrapper>
                  ))
              )}
            {
              !loading ? (
                authors && authors.totalDocs > authors.results.length? (
                  <LoadMoreBtn onClick={loadMoreAuthors} />
                ) : (
                    authors && authors.results.length > 0 && <EndOfData />
                  )
              ) : (
                  <Loading height = "40vh" />
                )
            }
          </div>
        </InPageNavigation>
      </div>
    </div>
  );
};

export default SearchComponent;