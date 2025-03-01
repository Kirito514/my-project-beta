import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import "./Endtime.css";

const Endtime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🌍 URL oxiridagi tilni olish
  const pathSegments = location.pathname.split("/");
  const lang = pathSegments[pathSegments.length - 1] || "en";

  // 🌍 Tilni almashtirganda URL yangilash
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    navigate(`/endtime/${newLang}`);
  };

  // 🌍 Til bo‘yicha matnlarni aniqlash
  const texts = {
    en: {
      title: "Congratulations!",
      message:
        "Congratulations! The moment you've been eagerly anticipating has finally arrived. Our platform is now officially live, opening up endless possibilities for you to embark on your journey, explore exciting new projects, and collaborate seamlessly with your team. Join us today and be part of something bigger—where creativity meets opportunity, and dreams turn into reality! 🚀✨",
      signUp: "Sign Up",
    },
    uz: {
      title: "Tabriklaymiz!",
      message:
        "Tabriklaymiz! Siz uzoq kutilgan lahzaga yetib keldingiz. Bizning platformamiz rasmiy ravishda ishga tushdi! Endi siz uchun cheksiz imkoniyatlar eshigi ochildi: o‘z loyihalaringizni boshlang, yangi qiziqarli g‘oyalarni o‘rganing va jamoangiz bilan bemalol hamkorlik qiling. Bugun bizga qo‘shiling va katta loyihaning bir qismi bo‘ling — bu yerda kreativlik imkoniyat bilan uchrashadi va orzular haqiqatga aylanadi! 🚀✨",
      signUp: "Ro‘yxatdan o‘tish",
    },
    ru: {
      title: "Поздравляем!",
      message:
        "Поздравляем! Наступил тот момент, которого вы так ждали. Наша платформа официально запущена, открывая перед вами бесконечные возможности: начните свой путь, исследуйте новые захватывающие проекты и безупречно сотрудничайте со своей командой. Присоединяйтесь к нам сегодня и станьте частью чего-то большего — там, где креативность встречается с возможностями, а мечты становятся реальностью! 🚀✨",
      signUp: "Регистрация",
    },
  };

  // 🔄 Ro‘yxatdan o‘tish bosilganda sahifaga o'tish
  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/signup/${lang}`); // ✅ SignUp sahifasiga o'tadi
    }, 500);
  };

  return (
    <div className="endtime">
      {showConfetti && (
        <Confetti numberOfPieces={150} gravity={0.3} wind={0} recycle={false} />
      )}

      {/* Home tugmasi */}
      <button
        className="home-btn"
        onClick={() => navigate(`/dashboard/${lang}`)}
      >
        Home
      </button>

      {/* 🌍 Til tanlash */}
      <div className="language-selector">
        <select id="language" value={lang} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="uz">O'zbek</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      <div className="endtime-message">
        <h1 className="endtime-title">{texts[lang].title}</h1>
        <p className="endtime-text">{texts[lang].message}</p>

        {/* Ro‘yxatdan o‘tish tugmasi */}
        <button
          className="endtime-btn"
          type="button"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : texts[lang].signUp}
        </button>
      </div>
    </div>
  );
};

export default Endtime;
