import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useLoading } from "../context/LoadingContext";
import LoadingSpinner from "../components/LoadingSpinner"; 
import DashboardContent from "../components/DashboardContent"; // 🔥 Ajratilgan komponent

const Dashboard = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [setLoading]);

  return loading ? ( 
    <LoadingSpinner />
  ) : (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <DashboardContent /> {/* 👈 Ajratilgan komponentni chaqiryapmiz */}
      </div>
    </div>
  );
};

export default Dashboard;
