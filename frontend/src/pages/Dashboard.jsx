import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar komponentini qo‘shamiz

const Dashboard = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate(`/login/${lang}`);
    } else {
      setUser(storedUser);
    }
  }, [navigate, lang]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* ✅ Sidebar qo‘shildi */}
      <div style={{ padding: "20px", flex: 1, textAlign: "center" }}>
        <h1>Dashboard</h1>
        {user ? <h2>Welcome, {user.name}!</h2> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Dashboard;
