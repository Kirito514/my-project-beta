import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../components/Notification";
import "./Login.css";

const messages = {
  en: {
    welcome: "Welcome Back, Please Login to Get started",
    emailPlaceholder: "Type your e-mail",
    passwordPlaceholder: "Type your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    login: "Login",
    signUp: "Sign up",
    otherAccounts: "or do it via other accounts",
    loginError: "Invalid email or password!",
    loginSuccess: "Login successful!",
    fillFields: "Please fill in all fields!",
  },
  uz: {
    welcome: "Xush kelibsiz, Iltimos tizimga kiring",
    emailPlaceholder: "E-mailingizni kiriting",
    passwordPlaceholder: "Parolingizni kiriting",
    rememberMe: "Meni eslab qol",
    forgotPassword: "Parolni unutdingizmi?",
    login: "Kirish",
    signUp: "Ro‘yxatdan o‘tish",
    otherAccounts: "yoki boshqa akkauntlar orqali",
    loginError: "Email yoki parol noto‘g‘ri!",
    loginSuccess: "Kirish muvaffaqiyatli!",
    fillFields: "Iltimos, barcha maydonlarni to‘ldiring!",
  },
  ru: {
    welcome: "Добро пожаловать, пожалуйста, войдите в систему",
    emailPlaceholder: "Введите ваш e-mail",
    passwordPlaceholder: "Введите ваш пароль",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    login: "Войти",
    signUp: "Зарегистрироваться",
    otherAccounts: "или используйте другие аккаунты",
    loginError: "Неверный email или пароль!",
    loginSuccess: "Вход выполнен успешно!",
    fillFields: "Пожалуйста, заполните все поля!",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lang = pathSegments[pathSegments.length - 1] || "en";
  const text = messages[lang] || messages["en"];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLanguageChange = (event) => {
    navigate(`/login/${event.target.value}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage(text.fillFields);
      setType("error");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login xatosi");

      const data = await response.json();

      // 🔥 Foydalanuvchini localStorage ga saqlash
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(text.loginSuccess);
      setType("success");

      navigate(`/dashboard/${lang}`);
    } catch (error) {
      setMessage(text.loginError);
      setType("error");
    }
  };

  return (
    <div className="loginSide">
      <Notification message={message} type={type} />
      <div className="loginLeftSide">
        <button
          className="loginSideTitle"
          onClick={() => navigate(`/home/${lang}`)}
        >
          My Project’s
        </button>
        <div className="SideInform">
          <h2 className="InformTitle">{text.welcome}</h2>
          <form id="loginInp" onSubmit={handleLogin}>
            <div className="log-input-container">
              <img
                src="../icons/user.png"
                alt="User Icon"
                className="log-input-icon"
              />
              <input
                type="email"
                placeholder={text.emailPlaceholder}
                className="log-input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="log-input-container">
              <img
                src="../icons/lock.png"
                alt="Password Icon"
                className="log-input-icon"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={text.passwordPlaceholder}
                className="log-input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                ></i>
              </button>
            </div>
            <aside className="log-check-terms-asd">
              <input type="checkbox" id="log-check-terms" />
              <label htmlFor="log-check-terms">
                <p>{text.rememberMe}</p>
                <a href={`/${lang}/forgot-password`}>{text.forgotPassword}</a>
              </label>
            </aside>
            <div className="log-btn-container">
              <button type="submit" className="btn log-btn-log">
                {text.login}
              </button>
              <button
                type="button"
                className="btn log-btn-reg"
                onClick={() => navigate(`/signup/${lang}`)}
              >
                {text.signUp}
              </button>
            </div>
          </form>
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
      <div className="loginRightSide">
        <div className="language-selector">
          <select value={lang} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="uz">O'zbek</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Login;
