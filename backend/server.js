const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

const usersFile = "users.json";
const emailsFile = "emails.json";

const messages = {
  en: {
    success: "You have successfully subscribed!",
    duplicate: "This email is already subscribed!",
    serverError: "Server error!",
    signupSuccess: "You have successfully registered!",
    emailExists: "This email is already in use!",
    fillAllFields: "Please fill in all fields!",
  },
  uz: {
    success: "Siz muvaffaqiyatli obuna bo‘ldingiz!",
    duplicate: "Bu email allaqachon obuna bo‘lgan!",
    serverError: "Server xatosi!",
    signupSuccess: "Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!",
    emailExists: "Bu email allaqachon mavjud!",
    fillAllFields: "Barcha maydonlarni to‘ldiring!",
  },
  ru: {
    success: "Вы успешно подписались!",
    duplicate: "Этот email уже подписан!",
    serverError: "Ошибка сервера!",
    signupSuccess: "Вы успешно зарегистрированы!",
    emailExists: "Этот email уже используется!",
    fillAllFields: "Заполните все поля!",
  },
};

// ✅ Ro‘yxatdan o‘tish (Signup)
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let language = req.headers["accept-language"] || "en";

  if (!messages[language]) {
    language = "en";
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: messages[language].fillAllFields });
  }

  const lowerCaseEmail = email.toLowerCase();

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  if (users.some((user) => user.email === lowerCaseEmail)) {
    return res.status(400).json({ message: messages[language].emailExists });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email: lowerCaseEmail,
    password: hashedPassword,
    date: new Date().toISOString(),
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: messages[language].signupSuccess });
});

// ✅ Emailni JSON faylga yozish (Subscribe)
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  let language = req.headers["accept-language"] || "en";

  if (!messages[language]) {
    language = "en";
  }

  if (!email) {
    return res.status(400).json({ message: messages[language].serverError });
  }

  const lowerCaseEmail = email.toLowerCase();

  let emails = [];
  if (fs.existsSync(emailsFile)) {
    emails = JSON.parse(fs.readFileSync(emailsFile));
  }

  if (emails.some((entry) => entry.email === lowerCaseEmail)) {
    return res.status(400).json({ message: messages[language].duplicate });
  }

  const newEmail = {
    id: emails.length + 1,
    email: lowerCaseEmail,
    date: new Date().toISOString(),
  };

  emails.push(newEmail);
  fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));

  res.json({ message: messages[language].success });
});

// 🚀 Serverni ishga tushirish
app.listen(5000, () => console.log("✅ Server running on port 5000"));
