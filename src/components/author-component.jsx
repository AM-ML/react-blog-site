import React, { useEffect, useState } from 'react';
import "../css/components/author-component.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TitleCase } from '../common/string';
import Preloader from '../common/preloader';

export default function AuthComponent() {
  let { id: authorId } = useParams();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-author", { id: authorId });
        setAuthor(response.data); // Access response data correctly
        console.log(response.data); // Log the correct data
      } catch (err) {
        console.log(err);
      }
    };
    getAuthor();
  }, [authorId]); // Include authorId in the dependency array

  let { name, blogs, email, is_author, username, profile_img } = author;

  return name?  (
    <div className="ac-container">
      <div className="ac-header">
        <div className="ac-img-container ac-i1">
          <img width={64} src={profile_img} className="ac-img" alt="" />
        </div>

        <div className="ac-name-container ac-i2">
          <div className="ac-name ac-i1">
            {name ? TitleCase(name) : "Loading..."}
          </div>
          <div className="ac-username ac-i2">
            @{username || ""}
          </div>
        </div>

        <div className="ac-author-badge btn-lg text-white">
          Published Blogs <span class="badge">52</span>
        </div>
      </div>
      <div className="hr mt-5 m-auto"></div>
    </div>
  ): <Preloader />;
}
