// Sidebar.js
import React, { useState } from 'react';
import '../css/components/profilesidebar.css';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`custom-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="custom-logo-details">
          <div className="custom-logo_name">constGenius</div>
          <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} id="custom-btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="custom-nav-list">
          <li>
            <i className='bx bx-search'></i>
            <input type="text" placeholder="Search..." />
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
            <Link to="/dashboard/user">
              <i className='bx bx-user'></i>
              <span className="custom-links_name">User</span>
            </Link>
            <span className="custom-tooltip">User</span>
          </li>
          <li>
            <Link to="/dashboard/messages">
              <i className='bx bx-chat'></i>
              <span className="custom-links_name">Messages</span>
            </Link>
            <span className="custom-tooltip">Messages</span>
          </li>
          <li>
            <Link to="/dashboard/analytics">
              <i className='bx bx-pie-chart-alt-2'></i>
              <span className="custom-links_name">Analytics</span>
            </Link>
            <span className="custom-tooltip">Analytics</span>
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
            <i role="button" className='bx bx-log-out' id="custom-log_out"></i>
          </li>
        </ul>
      </div>
      <section className={`custom-home-section ${isOpen ? 'open' : ''}`}>
        <div className="custom-text">Dashboard</div>
      </section>

    </>
  );
};

export default ProfileSidebar;
