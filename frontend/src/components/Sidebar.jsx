import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Notification from "../components/Notification";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // Mavjud bo'lgan sahifalar
  const availableRoutes = [
    "dashboard",
    "jobs",
    "about",
    "messages",
    "community",
    "settings",
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setMessage("Tizimdan chiqildi!");
    setType("error");
    navigate(`/login/${lang}`);
  };

  // Navigatsiyani boshqarish
  const handleNavigation = (page) => {
    if (availableRoutes.includes(page)) {
      navigate(`/${page}/${lang}`); // ✅ Faqat mavjud sahifalarga o'tkazadi
    } else {
      setMessage("Bu sahifa yoki menu hozircha mavjud emas!");
      setType("warning");
    }
  };

  const getMenuClass = (path) => {
    return location.pathname.includes(path) ? "btnPage active" : "btnPage";
  };

  return (
    <div className="sidebar">
      <Notification message={message} type={type} />
      <aside className="sidebarAside">
        <div className="avatar">
          <img src="/logo.svg" alt="ava" />
        </div>
        <div className="texts">
          <p className="dayText">Good day</p>
          <span className="sidebarTitle">My Project’s</span>
          <p className="statusPerson">online</p>
        </div>
      </aside>
      <div className="menu">
        <h3 className="menuTitle">
          Menu: <span>6</span>
        </h3>
        <button className={getMenuClass("/dashboard")} onClick={() => handleNavigation("dashboard")}>
          <img src="/icons/dashboard.svg" alt="" />
          <p>Dashboard</p>
        </button>
        <button className={getMenuClass("/jobs")} onClick={() => handleNavigation("jobs")}>
          <img src="/icons/job.svg" alt="" />
          <p>Jobs</p>
        </button>
        <button className={getMenuClass("/about")} onClick={() => handleNavigation("about")}>
          <img src="/icons/about-icon.svg" alt="" />
          <p>About me</p>
        </button>
        <button className={getMenuClass("/messages")} onClick={() => handleNavigation("messages")}>
          <img src="/icons/messaging-icon.svg" alt="" />
          <p>Messages</p>
        </button>
        <button className={getMenuClass("/community")} onClick={() => handleNavigation("community")}>
          <img src="/icons/community-icon.svg" alt="" />
          <p>Community</p>
        </button>
        <button className={getMenuClass("/settings")} onClick={() => handleNavigation("settings")}>
          <img src="/icons/setting-icon.svg" alt="" />
          <p>Settings</p>
        </button>
      </div>
      <div className="service">
        <h3 className="serviceTitle">
          Service: <span>0</span>
        </h3>
        <div className="createDiv">
          <button className="btnService">
            <img src="/icons/Plus.svg" alt="" />
            <p>Create new project</p>
          </button>
        </div>
      </div>
      <div className="friends">
        <h3 className="serviceTitle">
          Friends: <span>0</span>
        </h3>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
