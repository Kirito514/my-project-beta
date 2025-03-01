import React, { useState } from "react";
import Notification from "../components/Notification";
import "./Signup.css";

const messages = {
  en: {
    title: "Create your account",
    subtitle: "It's free and easy",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Type your e-mail or phone number",
    passwordPlaceholder: "Type your password",
    termsText: "By creating an account, you agree to the",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    register: "Register",
    login: "Login",
    otherAccounts: "or do it via other accounts",
    notification: {
      emptyFields: "All fields must be filled!",
      termsRequired: "You must accept the terms!",
      invalidEmail: "Invalid email format!",
      success: "Registration successful!",
    },
  },
  uz: {
    title: "Hisob yarating",
    subtitle: "Bu bepul va oson",
    namePlaceholder: "Ismingizni kiriting",
    emailPlaceholder: "E-mail yoki telefon raqamingizni kiriting",
    passwordPlaceholder: "Parolingizni kiriting",
    termsText: "Hisob yaratish orqali siz",
    terms: "Foydalanish shartlari",
    privacy: "Maxfiylik siyosati",
    register: "Ro‘yxatdan o‘tish",
    login: "Kirish",
    otherAccounts: "yoki boshqa akkauntlar orqali",
    notification: {
      emptyFields: "Barcha maydonlarni to‘ldirish shart!",
      termsRequired: "Siz shartlarga rozilik bildirishingiz kerak!",
      invalidEmail: "Email formati noto‘g‘ri!",
      success: "Ro‘yxatdan o‘tish muvaffaqiyatli!",
    },
  },
  ru: {
    title: "Создайте аккаунт",
    subtitle: "Это бесплатно и легко",
    namePlaceholder: "Введите ваше имя",
    emailPlaceholder: "Введите e-mail или номер телефона",
    passwordPlaceholder: "Введите ваш пароль",
    termsText: "Создавая аккаунт, вы соглашаетесь с",
    terms: "Условиями использования",
    privacy: "Политикой конфиденциальности",
    register: "Зарегистрироваться",
    login: "Войти",
    otherAccounts: "или используйте другие аккаунты",
    notification: {
      emptyFields: "Все поля должны быть заполнены!",
      termsRequired: "Вы должны принять условия!",
      invalidEmail: "Неверный формат email!",
      success: "Регистрация успешна!",
    },
  },
};

const Signup = () => {
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const text = messages[language];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setNotification({
        message: messages[language].notification.emptyFields,
        type: "error",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      setNotification({
        message: messages[language].notification.invalidEmail,
        type: "error",
      });
      return;
    }

    if (!formData.termsAccepted) {
      setNotification({
        message: messages[language].notification.termsRequired,
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language, // 🛠 Tilingizni serverga jo‘natamiz
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: data.message, type: "success" });

        // 🔄 Inputlarni tozalash
        setFormData({
          name: "",
          email: "",
          password: "",
          termsAccepted: false,
        });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setNotification({
        message: messages[language].notification.serverError,
        type: "error",
      });
    }
  };

  return (
    <div className="sign-up">
      <Notification message={notification.message} type={notification.type} />

      <div className="leftSide">
        <button
          className="leftSideTitle"
          onClick={() => (window.location.href = "/dashboard")}
        >
          My Project’s
        </button>
      </div>

      <div className="rightSide">
        <h2 className="rightSideTitle">{text.title}</h2>
        <h4 className="rightSideTitleText">{text.subtitle}</h4>

        <div className="language-selector">
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="uz">O'zbek</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        <form id="inputsNameInp">
          <div className="input-container">
            <img
              src="../icons/user.png"
              alt="User Icon"
              className="input-icon"
            />
            <input
              type="text"
              name="name"
              placeholder={text.namePlaceholder}
              className="input-field"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <img
              src="../icons/email.png"
              alt="Email Icon"
              className="input-icon email-inp"
            />
            <input
              type="email"
              name="email"
              placeholder={text.emailPlaceholder}
              className="input-field"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <img
              src="../icons/lock.png"
              alt="Password Icon"
              className="input-icon"
            />
            <input
              type="password"
              name="password"
              placeholder={text.passwordPlaceholder}
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <aside>
            <input
              type="checkbox"
              id="check-terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="check-terms">
              {text.termsText} <a href="#"> {text.terms}</a> {text.privacy}.
            </label>
          </aside>
        </form>

        <div className="button-container">
          <button type="button" className="btn btn-reg" onClick={handleSubmit}>
            {text.register}
          </button>
          <button type="button" className="btn btn-log">
            {text.login}
          </button>
        </div>

        <p className="rightSideOtherAcc">{text.otherAccounts}</p>
        <ul className="rightSideOtherbtn">
          <li>
            <a href="#">
              <img src="/icons/google.png" alt="Google" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/apple.png" alt="Apple" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/github.png" alt="GitHub" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Signup;
