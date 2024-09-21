import axios from "axios";
import "../css/components/blog-component.css";
import { useEffect, useState } from "react";
import Loading from "../common/loading";
import AnimationWrapper from "../common/page-animation";
import { TitleCase } from "../common/string";
import { Link } from "react-router-dom";
import { formatDate } from "../common/functions";
import BlogCard from "./blog-card";
import LoadMoreBtn from "../common/load-more";


const BlogComponent = ({ blogId }) => {

  const [blog, setBlog] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [relatedBlogsLoading, setRelatedBlogsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  let {
    tags = [],
    title = "",
    banner = "",
    content = "",
    description = "",
    publishedAt = "",
    author: {
      personal_info: { name = "", username = "", profile_img = "" } = {}
    } = {}
  } = blog;

  useEffect(() => {
    const getRelatedBlogsData = ({ tags = [], blogId = '' }) => {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tags, limit: 5 })
      .then(({ data }) => {
          data.blogs = data.blogs.filter(dBlog => dBlog.blog_id != blogId);
          setRelatedBlogs({results: data.blogs, totalDocs: data.totalDocs - 1, page: 1});
      })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
          setRelatedBlogsLoading(false);
        });
    }

    const getBlogData = () => {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id: blogId })
      .then(({ data }) => {
          setBlog(data.blog);
          console.log(data.blog);  // Changed to log the fetched blog data
          console.log(data.blog.content);  // Changed to log the fetched blog data
          getRelatedBlogsData({ tags: data.blog.tags, blogId: data.blog.blog_id });
        })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
          setLoading(false);
      });
    }


    getBlogData();
  }, [blogId]);


  useEffect(() => {console.log(relatedBlogs)}, [relatedBlogs]);


  const loadMoreRelatedBlogs = () => {
    setFetchLoading(true);

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tags, limit: 5 })
    .then(({ data }) => {
        data.blogs = data.blogs.filter(dBlog => dBlog.blog_id != blogId);
        setRelatedBlogs({results: [...relatedBlogs.results, ...data.blogs], totalDocs: data.totalDocs - 1, page: relatedBlogs.page + 1});
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {setFetchLoading(false)});
  }

  return (
    <AnimationWrapper>
      {loading ? <Loading height="70vh" /> :
        <>
          <div className="bbc-container">

            <div className="bbc-bc aspect-video">
              <img src={banner} alt="" className="bbc-bc-img" />
            </div>

            <div className="bbc-title-container">
              <h2 className="bbc-title">{ TitleCase(title) }</h2>
            </div>

            <div className="bbc-fb">
              <div className="bbc-author">
                <img src={profile_img} alt="" className="bbc-author-img" />

                <p className="bbc-author-text">
                  { TitleCase(name) }
                  <br />
                  <Link className="bbc-author-username" to={`/author/${username}`}>@{username}</Link>
                </p>
              </div>

              <p className="bbc-date">Published On {formatDate(publishedAt)}</p>

            </div>

          </div>


          <div className="bbc-rb-container">
            { relatedBlogsLoading || !relatedBlogs ? <Loading height="30vh" /> :
              !relatedBlogs.results.length? <div className="bbc-rb-no-data">
                <h1 className="bbc-rb-section-title">Related Blogs</h1>
                <h1 className="bbc-rb-no-data-text text-dark text-bold" >No Blogs Found.</h1>
              </div>:
              <>
                <h1 className="bbc-rb-section-title">Related Blogs</h1>
                <div className="bbc-rb-blogs">
                  {
                    relatedBlogs.results.map((rBlog, i) => {
                      return <AnimationWrapper key={i}
                        transition={{ duration: 1, delay: (i%10) * 0.07 }}
                      >
                        <BlogCard addBorder={true} blog={rBlog} />
                      </AnimationWrapper>
                    })
                  }
                </div>
                {
                  relatedBlogs && !fetchLoading && relatedBlogs.results.length &&
                    relatedBlogs.results.length < relatedBlogs.totalDocs &&
                    <LoadMoreBtn onClick={loadMoreRelatedBlogs} />
                }
                { fetchLoading && <Loading height="30vh" />
                }
              </>
            }
          </div>
        </>
      }
    </AnimationWrapper>
  );
}

export default BlogComponent;

