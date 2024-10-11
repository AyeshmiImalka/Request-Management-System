import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { faTachometerAlt, faClipboardList, faCommentDots, faFileAlt, faUser, faCog, faCaretDown, faBell, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';  // Assuming you already have this file

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">e-hospital</div>
      
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-icon"><HomeIcon /></span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/requests" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon"><FormatListBulletedIcon /></span>
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/feedbacks" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon"><ChatIcon /></span>
            Feedbacks
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon"><ArticleIcon /></span>
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon"><PersonIcon /></span>
            Patients
          </NavLink>
        </li>
        <li className="navbar__dropdown">
          <button onClick={toggleDropdown}>
            <span className="nav-icon"><SettingsIcon /></span>
            Settings <ArrowDropDownIcon />
          </button>
          {dropdownOpen && (
            <ul className="dropdown__menu">
              <li><NavLink to="/settings/profile">Profile</NavLink></li>
              <li><NavLink to="/settings/account">Account</NavLink></li>
              <li><NavLink to="/settings/notifications">Notifications</NavLink></li>
            </ul>
          )}
        </li>
      </ul>

      <div className="navbar__right">
        <div className="navbar__icon">
          <FontAwesomeIcon icon={faMoon} />
        </div>
        <div className="navbar__icon">
        <Badge sx={{ "& .MuiBadge-dot": { backgroundColor: "#ff3308" } }} 
         variant="dot">
          <NotificationsIcon />
        </Badge>
        </div>
        <div className="navbar__welcome">
          <span>Welcome</span>
          <strong>Admin</strong>
        </div>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />  
        </Stack>
      </div>
    </nav>
  );
};

export default Navbar;