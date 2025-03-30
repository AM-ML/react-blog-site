import React, { useEffect, useState } from 'react';
import "../css/components/author-component.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TitleCase } from '../common/string';
import Preloader from '../common/preloader';
import NoData from '../common/nodata';
import AnimationWrapper from '../common/page-animation';
import Loading from '../common/loading';
import BlogCard from './blog-card';
import LoadMoreBtn from '../common/load-more';

export default function AuthComponent() {
  let { username: URLusername } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  useEffect(() => {
    const getAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-author", {
          username: URLusername,
        });
        setAuthor(response.data);
        if (response.data.id) {
          setBlogLoading(true);
          await getBlogs({ page: 1, user_id: response.data.id, doCreate: true });
          setBlogLoading(false);
        }
      } catch ({ response: { data: { error } } }) {
        setErrMsg(error ? error : "An Error Occurred.");
      } finally {
        setLoading(false);
      }
    };
    getAuthor();
  }, [URLusername]);

  const getBlogs = async ({ page = 1, user_id = author.id, doCreate = false }) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        author_id: user_id,
        page,
      });

      setBlogs(prev => {
        if (doCreate || !prev || !prev.results) {
          return { results: data.blogs, totalDocs: data.totalDocs, user_id: author.id, page };
        }
        return {
          results: [...prev.results, ...data.blogs],
          totalDocs: data.totalDocs,
          user_id: prev.user_id,
          page,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  const loadMore = () => {
    if (blogs && blogs.results.length < blogs.totalDocs) {
      setMoreLoading(true);
      getBlogs({ page: blogs.page + 1, user_id: author.id, doCreate: false });
    }
  }

  // Format the joinedAt date if author exists
  let formattedDate = '';
  if (author.joinedAt) {
    const date = new Date(author.joinedAt);
    formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: 'short' }).replace(',', '.');
  }

  if (loading) return <Preloader />;
  if (errMsg) return <NoData msg={errMsg} btnMsg="Go Home" onClick={goHome} />;


  return (
    <div className="ac-container">
      <div className="ac-profile-container max-800-visible">
        <div className="ac-profile">

          <div className="ac-profile-row">
            <img src={author.profile_img} className="ac-profile-img" alt="Profile" />

            <div className="ac-profile-col">
              <h1 className="ac-profile-name">{TitleCase(author.name)}</h1>
              <span className="ac-profile-email">{author.email}</span>
              <span className="ac-profile-blogs-count">{author.total_posts} Blogs - Joined At {formattedDate}</span>
              <div className="ac-profile-socials">
            {author.social_links && author.social_links.linkedin && <a target="_blank" href={author.social_links.linkedin} className="bx bxl-linkedin-square"></a>}
            {author.social_links && author.social_links.facebook && <a target="_blank" href={author.social_links.facebook} className="bx bxl-facebook-square"></a>}
            {author.social_links && author.social_links.instagram && <a target="_blank" href={author.social_links.instagram} className="bx bxl-instagram-alt"></a>}
            {author.social_links && author.social_links.twitter && <a target="_blank" href={author.social_links.twitter} className="bx bxl-twitter"></a>}
          </div>
            </div>
          </div>


          <span className="ac-profile-bio">{author.bio.length ? `"${author.bio}"` : "No Bio."}</span>
          <div className="sm-hr"></div>
        </div>
      </div>

      <div className="ac-blogs-container">
        <div className="ac-blogs me-2">
          {blogLoading ? (
            <Loading height={"60vh"} />
          ) : (
              <>
                {blogs && blogs.results && blogs.results.length > 0 ? (
                  blogs.results.map((blog, i) => {
                    const isLastPage = (i + 1) / 10 === blogs.page;
                    const isLastDoc = i + 1 === blogs.totalDocs;
                    const addBorder = !(isLastDoc !== isLastPage);

                    return (
                      <AnimationWrapper key={i} transition={{ duration: 1, delay: (i % 10) * 0.07 }}>
                        <BlogCard blog={blog} addBorder={addBorder} />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                    !blogs ? <Loading height="70vh" />:
                      <NoData
                        msg={blogs && blogs.results.length === 0 ? "No Blogs Found." : "Loading..."}
                        addBtn={true}
                        btnMsg={"Go Back"}
                        onClick={goBack}
                      />
                  )}
                {blogs && blogs.results && blogs.results.length < blogs.totalDocs && (
                  <div className="ac-lm-container">
                    {!moreLoading ? <LoadMoreBtn onClick={loadMore} /> : <Loading height="30vh" />}
                  </div>
                )}
              </>
            )}
        </div>
      </div>

      <div className="ac-profile-container max-800-hidden">
        <div className="ac-profile">
          <img src={author.profile_img} className="ac-profile-img" alt="Profile" />
          <h1 className="ac-profile-name">{TitleCase(author.name)}</h1>
          <span className="ac-profile-email">{author.email}</span>
          <span className="ac-profile-blogs-count">{author.total_posts} Blogs - Joined At {formattedDate}</span>
          <div className="ac-profile-socials">
            {author.social_links && author.social_links.linkedin && <a target="_blank" href={author.social_links.linkedin} className="bx bxl-linkedin-square"></a>}
            {author.social_links && author.social_links.facebook && <a target="_blank" href={author.social_links.facebook} className="bx bxl-facebook-square"></a>}
            {author.social_links && author.social_links.instagram && <a target="_blank" href={author.social_links.instagram} className="bx bxl-instagram-alt"></a>}
            {author.social_links && author.social_links.twitter && <a target="_blank" href={author.social_links.twitter} className="bx bxl-twitter"></a>}
          </div>
          <span className="ac-profile-bio">{author.bio.length ? `"${author.bio}"` : "No Bio."}</span>
        </div>
      </div>
    </div>
  );
}

