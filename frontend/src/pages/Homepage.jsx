import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { lang } = useParams(); // URL-dan tilni olish

  // 🌍 Til bo‘yicha matnlarni aniqlash
  const texts = {
    en: {
      title: "Build. Collaborate. Grow.",
      subtitle:
        "Team up, work on real projects, and take your IT skills to the next level.",
      getStarted: "Get Started",
      navLinks: [
        "How It Works",
        "Features",
        "Projects",
        "Community",
        "Jobs",
        "Pricing",
        "Blog",
      ],
    },
    uz: {
      title: "Quring. Hamkorlik qiling. O‘sib boring.",
      subtitle:
        "Jamoa bo‘lib ishlang, haqiqiy loyihalarda qatnashing va IT ko‘nikmalaringizni yangi bosqichga olib chiqing.",
      getStarted: "Boshlash",
      navLinks: [
        "Qanday ishlaydi",
        "Xususiyatlar",
        "Loyihalar",
        "Jamiyat",
        "Ish o‘rinlari",
        "Narxlar",
        "Blog",
      ],
    },
    ru: {
      title: "Стройте. Сотрудничайте. Развивайтесь.",
      subtitle:
        "Работайте в команде, участвуйте в реальных проектах и повышайте свои навыки в IT.",
      getStarted: "Начать",
      navLinks: [
        "Как это работает",
        "Функции",
        "Проекты",
        "Сообщество",
        "Работа",
        "Цены",
        "Блог",
      ],
    },
  };

  // 🌍 Tilni o‘zgartirish
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    navigate(`/home/${newLang}`);
  };

  // 🌍 Ro‘yxatdan o‘tish bosilganda Signup sahifasiga o'tish
  const handleGetStarted = () => {
    navigate(`/signup/${lang}`);
  };

  return (
    <div className='homePage'>
      <nav className='homePageNav'>
        <button className='homePageTitle'>
          <img src='../../public/logo.svg' alt='logo' />
          <h3>My Project’s</h3>
        </button>
        <ul className='homePageLink'>
          {texts[lang]?.navLinks.map((link, index) => (
            <li key={index}>
              <a href='#'>{link}</a>
            </li>
          ))}
        </ul>

        <button className='homePageStartedBtn' onClick={handleGetStarted}>
          {texts[lang]?.getStarted}
        </button>
        {/* 🌍 Til tanlash dropdown */}
        <div className='language-selector'>
          <select id='language' value={lang} onChange={handleLanguageChange}>
            <option value='en'>English</option>
            <option value='uz'>O'zbek</option>
            <option value='ru'>Русский</option>
          </select>
        </div>

      </nav>

      <div className='homePageContent'>
        <h2 className='pageContentTitle'>{texts[lang]?.title}</h2>
        <p className='pageContentTitleText'>{texts[lang]?.subtitle}</p>
        <div className='dashboardImg'>
          <img src='../images/dashboard.png' alt='dashboard' />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
