import React from 'react';
import styles from './SideBar.module.css';

import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // 🚀 LOGOUT FUNCTION
  const handleLogout = () => {

    // clear session
    localStorage.removeItem("user");
    localStorage.clear();

    // redirect to login
    navigate("/");
  };

  return (
    <div className={styles.sideBar}>

      {/* HEADER */}
      <div className={styles.sideBarIcon}>
        <ArticleIcon />
        <div>Resume Screening</div>
      </div>

      {/* DASHBOARD */}
      <Link to="/dashboard" className={styles.link}>
        <div
          className={[
            styles.sideBarOption,
            location.pathname === "/dashboard"
              ? styles.selectedOption
              : ""
          ].join(" ")}
        >
          <DashboardIcon sx={{ fontSize: 22 }} />
          <div>Dashboard</div>
        </div>
      </Link>

      {/* HISTORY */}
      <Link to="/history" className={styles.link}>
        <div
          className={[
            styles.sideBarOption,
            location.pathname === "/history"
              ? styles.selectedOption
              : ""
          ].join(" ")}
        >
          <ManageSearchIcon sx={{ fontSize: 22 }} />
          <div>History</div>
        </div>
      </Link>

      {/* LOGOUT */}
      <div
        className={styles.sideBarOption}
        onClick={handleLogout}
      >
        <LogoutIcon sx={{ fontSize: 22 }} />
        <div>Logout</div>
      </div>

    </div>
  );
};

export default SideBar;