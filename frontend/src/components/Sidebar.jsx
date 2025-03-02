import React from "react";
import { Link, useParams } from "react-router-dom";

const Sidebar = () => {
  const { lang } = useParams(); // Foydalanuvchi tanlagan til

  return (
    <div
      style={{
        width: "250px",
        background: "#f4f4f4",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to={`/dashboard/${lang}`}>Dashboard</Link>
        </li>
        <li>
          <Link to={`/profile/${lang}`}>Profile</Link>
        </li>
        <li>
          <Link to={`/settings/${lang}`}>Settings</Link>
        </li>
        <li>
          <Link to={`/login/${lang}`}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
