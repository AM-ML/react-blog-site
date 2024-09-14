import React, { useEffect, useState } from 'react';
import "../css/components/author-component.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TitleCase } from '../common/string';
import Preloader from '../common/preloader';
import NoData from '../common/nodata';

export default function AuthComponent() {
  let { username: URLusername } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  }

  useEffect(() => {
    const getAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-author",
          { username: URLusername });
        setAuthor(response.data); // Access response data correctly
        setLoading(false);
      } catch ( { response: { data: { error } } } ) {
        setLoading(false);
        console.log();
        setErrMsg(error? error : "An Error Occurred.");
      }
    };
    getAuthor();
  }, [URLusername]); // Include authorId in the dependency array

  let { is_author, name, username, email, bio, profile_img, social_links, total_posts} = author;

  return (
    loading?  <Preloader /> :
    errMsg? <NoData msg={errMsg} btnMsg="Go Home" onClick={goHome} /> :
    <div className="ac-container">
      <div className="ac-header">
        <div className="ac-img-container ac-i1">
          <img width={64} src={profile_img} className="ac-img" alt="" />
        </div>

        <div className="ac-name-container ac-i2">
          <div className="ac-name ac-i1">
            {TitleCase(name)}
          </div>
          <div className="ac-username ac-i2">
            @{username}
          </div>
        </div>

        <div className="ac-author-badge btn-lg text-white">
          Published Blogs <span className="badge">{ total_posts }</span>
        </div>
      </div>
      <div className="hr mt-5 m-auto"></div>
    </div>
  )
}
