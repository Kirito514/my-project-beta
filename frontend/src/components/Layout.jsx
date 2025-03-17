import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Outlet /> {/* 🔥 Bu yerda Dashboard, Settings, Chat va boshqalar yuklanadi */}
      </div>
    </div>
  );
};

export default Layout;
