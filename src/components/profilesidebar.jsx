// Sidebar.js
import React, { useContext, useRef, useState } from 'react';
import '../css/components/profilesidebar.css';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../Router";
import AnimationWrapper from '../common/page-animation';
import { removeFromSession } from './session';
import { TitleCase, removeLastName } from '../common/string';

const ProfileSidebar = () => {
  let { userAuth: { id, is_author, access_token, name, profile_img, username }, setUserAuth } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const searchRef = useRef();

  const handleClickSearch = () => {
    if(!isOpen) toggleSidebar();
    searchRef.current.focus();
  }

  const handleLogOut = () => {
    removeFromSession("user");
    setUserAuth({access_token: null});
  }

  return (
    access_token?
    <AnimationWrapper transition={{duration:0.5}}>
      <div className={`custom-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="custom-logo-details">
          <div className="custom-logo_name">Account</div>
          <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="custom-btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="custom-nav-list">
          <li>
            <Link to="/">
              <i className='bx bx-home'></i>
              <span className="custom-links_name">Home</span>
            </Link>
            <span className="custom-tooltip">Home</span>
          </li>
          <li>
            <Link to="/dashboard">
              <i className='bx bx-grid-alt'></i>
              <span className="custom-links_name">Account</span>
            </Link>
            <span className="custom-tooltip">Account</span>
          </li>
            { is_author && <li>
            <Link to="/dashboard/writer/drafts">
              <i className='bx bx-file'></i>
              <span className="custom-links_name">Drafts</span>
            </Link>
            <span className="custom-tooltip">Drafts</span>
          </li> }
          {is_author && <li>
            <Link to="/dashboard/writer/write">
              <i className='bx bx-edit'></i>
              <span className="custom-links_name">Write Blogs</span>
            </Link>
            <span className="custom-tooltip">Write Blogs</span>
          </li>}

          {is_author && <li>
            <Link to={`/dashboard/author/${id}`}>
              <i className='bx bx-user'></i>
              <span className="custom-links_name">View Profile</span>
            </Link>
            <span className="custom-tooltip">View Profile</span>
          </li>}
          <li>
            <Link to="/dashboard/settings">
              <i className='bx bx-cog'></i>
              <span className="custom-links_name">Settings</span>
            </Link>
            <span className="custom-tooltip">Settings</span>
          </li>
          <li className="custom-profile">
            <div className="custom-profile-details">
              <img src={profile_img} alt="Profile" />
              <div className="custom-name_job">
                <div className="custom-name text-clamp">{TitleCase(removeLastName(name))}</div>
                <div className="custom-job">@{username}</div>
              </div>
            </div>
            <i role="button" onClick={handleLogOut} className='bx bx-log-out' id="custom-log_out"></i>
          </li>
        </ul>
      </div>
      <section className={`custom-home-section ${isOpen ? 'open' : ''}`}>
        <div className="custom-panel-container">
          <Outlet />
        </div>
      </section>

    </AnimationWrapper>
    :
    <Navigate to="/signin" />
  );
};

export default ProfileSidebar;
