import React, { useState, useEffect } from "react";
import "./Comingsoon.css";
import Notification from "../components/Notification";
import EndTime from "../components/Endtime"; // EndTime komponentini import qilish
import { useNavigate } from "react-router-dom"; // useNavigate ni import qilish

const translations = {
  en: {
    welcome: "Welcome to the",
    platform: "Platform",
    days: "day",
    hours: "hour",
    minutes: "min",
    seconds: "sec",
    notifyPlaceholder: "Notify me",
    socialText: "Our other social networks",
    errorEmail: "Please enter your email!",
    successEmail: "Successfully subscribed!",
    serverError: "Server error!",
  },
  uz: {
    welcome: "Xush kelibsiz",
    platform: "Platformasiga",
    days: "kun",
    hours: "soat",
    minutes: "daq",
    seconds: "soniya",
    notifyPlaceholder: "Emailni kiriting",
    socialText: "Bizning boshqa ijtimoiy tarmoqlarimiz",
    errorEmail: "Emailni kiriting!",
    successEmail: "Siz muvaffaqiyatli obuna bo‘ldingiz!",
    serverError: "Server xatosi!",
  },
  ru: {
    welcome: "Добро пожаловать",
    platform: "Платформа",
    days: "день",
    hours: "час",
    minutes: "мин",
    seconds: "сек",
    notifyPlaceholder: "Введите email",
    socialText: "Наши другие социальные сети",
    errorEmail: "Введите email!",
    successEmail: "Вы успешно подписались!",
    serverError: "Ошибка сервера!",
  },
};

const Comingsoon = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [isCountdownFinished, setIsCountdownFinished] = useState(false); // Hisoblagich tugaganligini nazorat qilish
  const navigate = useNavigate(); // useNavigate hookini chaqirish
  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }

        return 59;
      });

      setMinutes((prevMinutes) => {
        if (seconds === 0) {
          if (prevMinutes > 0) {
            return prevMinutes - 1;
          }

          return 59;
        }
        return prevMinutes;
      });

      setHours((prevHours) => {
        if (minutes === 0 && seconds === 0) {
          if (prevHours > 0) {
            return prevHours - 1;
          }

          return 23;
        }
        return prevHours;
      });

      setDays((prevDays) => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          if (prevDays > 0) {
            return prevDays - 1;
          }

          clearInterval(countdown);
          setIsCountdownFinished(true);
          navigate(`/endtime/${language}`);
          return 0;
        }
        return prevDays;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds, minutes, hours, days, navigate, language]); // 🔥 `useEffect` bog‘liqliklari to‘g‘ri berildi

  const handleSubscribe = async () => {
    if (email.trim() === "") {
      setNotification({
        message: translations[language].errorEmail,
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        // 🔹 Endi `/subscribe`
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: data.message, type: "success" });
        setEmail(""); // Inputni tozalash
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setNotification({
        message: translations[language].serverError,
        type: "error",
      });
    }

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  
    // 🌍 Hamma sahifalarda tilni yangilash
    navigate(window.location.pathname.replace(/\/(en|uz|ru)/, `/${selectedLang}`));
  };
  

  return (
    <div className='dashboard'>
      <Notification message={notification.message} type={notification.type} />

      <div className='language-selector'>
        <select id='language' value={language} onChange={handleLanguageChange}>
          <option value='en'>English</option>
          <option value='uz'>O'zbek</option>
          <option value='ru'>Русский</option>
        </select>
      </div>
      <h1 className='title'>
        {translations[language].welcome} <br />
        <span>My Project’s</span> | {translations[language].platform}
      </h1>

      {!isCountdownFinished ? ( // Hisoblagich tugamasa
        <div className='countdown'>
          <div className='box'>
            <span>{String(days).padStart(2, "0")}</span>
            {translations[language].days}
          </div>
          <div className='box'>
            <span>{String(hours).padStart(2, "0")}</span>
            {translations[language].hours}
          </div>
          <div className='box'>
            <span>{String(minutes).padStart(2, "0")}</span>
            {translations[language].minutes}
          </div>
          <div className='box'>
            <span>{String(seconds).padStart(2, "0")}</span>
            {translations[language].seconds}
          </div>
        </div>
      ) : (
        <EndTime /> // Hisoblagich tugasa EndTime komponentini ko'rsatish
      )}

      <form>
        <input
          type='email'
          name='email'
          id='email'
          placeholder={translations[language].notifyPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='send-btn' type='button' onClick={handleSubscribe}>
          <img src='/icons/email.png' alt='email' />
        </button>
       <div className="comming-social">
       <p className='social'>{translations[language].socialText}</p>
        <ul className='social-ul'>
          <li>
            <a href='#'>
              <img src='/icons/telegram.png' alt='' />
            </a>
          </li>
          <li>
            <a href='#'>
              <img src='/icons/x.png' alt='' />
            </a>
          </li>
          <li>
            <a href='#'>
              <img src='/icons/discord.png' alt='' />
            </a>
          </li>
        </ul>
       </div>
      </form>
    </div>
  );
};

export default Comingsoon;
