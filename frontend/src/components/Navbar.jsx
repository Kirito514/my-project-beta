import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || { name: "Guest", image: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(user.name !== "Guest");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [searchTerm, setSearchTerm] = useState("");

  const defaultAvatar = "../../public/icons/user.png"; // 🔹 Default avatar rasmi

  useEffect(() => {
    if (isLoggedIn) {
      setNotification({ message: `Xush kelibsiz, ${user.name}!`, type: "success" });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [isLoggedIn, user.name]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "Guest", image: "" });
    setIsLoggedIn(false);

    setNotification({ message: "Tizimdan chiqildi!", type: "error" });
    setShowNotification(true);

    setTimeout(() => {
      window.location.href = "/login/en";
    }, 1500);
  };

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "logout") {
      handleLogout();
    } else {
      setLanguage(selectedValue);
      localStorage.setItem("language", selectedValue);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const performSearch = () => {
    console.log("Qidirilayotgan so‘z:", searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="navbar">
      {showNotification && <Notification message={notification.message} type={notification.type} />}

      <div className="search-div">
        <input
          className="search-inp"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={performSearch} className="search-btn">
          <img className="search-inp-icon" src="/icons/search.svg" alt="Search" />
        </button>
      </div>

      <button className="notific-btn" type="button">
        <img src="/icons/bells.svg" alt="Notifications" />
      </button>

      <div className="user">
        <div className="user-pic">
          <img
            src={user.image || defaultAvatar} // ✅ Agar user.image bo‘lsa, ishlatiladi, aks holda default
            alt="User"
            onError={(e) => e.target.src = defaultAvatar} // ✅ Agar rasm yuklanmasa, default rasmga almashtiriladi
          />
        </div>

        <select className="user-selection" name="user" id="person" onChange={handleSelectionChange}>
          <option value="">{user.name}</option>
          <option value="en">English</option>
          <option value="uz">O'zbek</option>
          <option value="ru">Русский</option>
          {isLoggedIn && <option value="logout">Log Out</option>}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
