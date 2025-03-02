import React, { useEffect, useState } from "react";
import checkIcon from "../../public/icons/check.png";
import errorIcon from "../../public/icons/error.png";
import "../components/Notification.css";

const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className={`notification ${type} ${visible ? "show" : ""}`}>
      {type === "success" && (
        <img src={checkIcon} className="success-icon" alt="Success" />
      )}
      {type === "error" && (
        <img src={errorIcon} className="error-icon" alt="Error" />
      )}
      <p id="notification-message">{message}</p>
    </div>
  );
};

export default Notification;
