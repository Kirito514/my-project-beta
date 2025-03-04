import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification"; // ✅ Notification komponentini chaqiramiz
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user"); // 🔴 Foydalanuvchi ma'lumotlarini o‘chirish

    // ✅ NOTIFICATION: "Tizimdan chiqildi"
    setMessage("Tizimdan chiqildi!");
    setType("error");

    setTimeout(() => {
      navigate("/login/en"); // 🔴 Login sahifasiga yo‘naltirish
    }, 1500);
  };

  return (
    <div className='sidebar'>
      <Notification message={message} type={type} />{" "}
      {/* ✅ Notification qo‘shildi */}
      <aside className='sidebarAside'>
        <div className='avatar'>
          <img src='../../public/icons/user.png' alt='ava' />
        </div>
        <div className='texts'>
          <p className='dayText'>Good day</p>
          <span className='sidebarTitle'>My Project’s</span>
          <p className='statusPerson'>online</p>
        </div>
      </aside>
      <div className='menu'>
        <h3 className='menuTitle'>
          Menu: <span>5</span>
        </h3>
        <button className='btnPage'>
          <img src='../../public/icons/dashboard.svg' alt='' />
          <p>Dashboard</p>
        </button>
        <button className='btnPage'>
          <img src='../../public/icons/job.svg' alt='' />
          <p>Jobs</p>
        </button>
        <button className='btnPage'>
          <img src='../../public/icons/about-icon.svg' alt='' />
          <p>About me</p>
        </button>
        <button className='btnPage'>
          <img src='../../public/icons/messaging-icon.svg' alt='' />
          <p>Messages</p>
        </button>
        <button className='btnPage'>
          <img src='../../public/icons/community-icon.svg' alt='' />
          <p>Community</p>
        </button>
        <button className='btnPage'>
          <img src='../../public/icons/setting-icon.svg' alt='' />
          <p>Settings</p>
        </button>
      </div>
      <div className='service'>
        <h3 className='serviceTitle'>
          Service: <span>0</span>
        </h3>
        <div className='createDiv'>
          <button className='btnService'>
            <img src='../../public/icons/Plus.svg' alt='' />
            <p>Create new project</p>
          </button>
        </div>
      </div>
      <div className='friends'>
        <h3 className='serviceTitle'>
          Friends: <span>0</span>
        </h3>
      </div>
      {/* 🚀 Logout tugmachasi */}
      <button className='logout-btn' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
