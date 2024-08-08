// Sidebar.js
import React, { useContext, useRef, useState } from 'react';
import '../css/components/profilesidebar.css';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../Router";
import AnimationWrapper from '../common/page-animation';
import { removeFromSession } from './session';

const ProfileSidebar = () => {
  let { userAuth: { access_token, username }, setUserAuth } = useContext(UserContext);
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
          <div className="custom-logo_name">Dashboard</div>
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
          <li onClick={handleClickSearch}>
            <i className='bx bx-search'></i>
            <input ref={searchRef} type="text" placeholder="Search..." />
            <span className="custom-tooltip">Search</span>
          </li>
          <li>
            <Link to="/dashboard">
              <i className='bx bx-grid-alt'></i>
              <span className="custom-links_name">Dashboard</span>
            </Link>
            <span className="custom-tooltip">Dashboard</span>
          </li>
          <li>
            <Link to="/dashboard/writer/write">
              <i className='bx bx-edit'></i>
              <span className="custom-links_name">Write Blogs</span>
            </Link>
            <span className="custom-tooltip">Write Blogs</span>
          </li>
          <li>
            <Link to="/dashboard/analytics">
              <i className='bx bx-pie-chart-alt-2'></i>
              <span className="custom-links_name">Analytics</span>
            </Link>
            <span className="custom-tooltip">Analytics</span>
          </li> 
          <li>
            <Link to={`/user/${username}`}>
              <i className='bx bx-user'></i>
              <span className="custom-links_name">Profile</span>
            </Link>
            <span className="custom-tooltip">Profile</span>
          </li>
          <li>
            <Link to="/dashboard/settings">
              <i className='bx bx-cog'></i>
              <span className="custom-links_name">Settings</span>
            </Link>
            <span className="custom-tooltip">Settings</span>
          </li>
          <li className="custom-profile">
            <div className="custom-profile-details">
              <img src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=Mia" alt="Profile" />
              <div className="custom-name_job">
                <div className="custom-name">Ali M. Moumneh</div>
                <div className="custom-job">@user-asij2oi3fi2n</div>
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
