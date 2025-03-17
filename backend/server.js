const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const usersFile = "users.json";
const emailsFile = "emails.json";
const secretKey = process.env.SECRET_KEY || "supersecretkey"; 

const messages = {
  en: {
    success: "You have successfully subscribed!",
    duplicate: "This email is already subscribed!",
    serverError: "Server error!",
    signupSuccess: "You have successfully registered!",
    emailExists: "This email is already in use!",
    fillAllFields: "Please fill in all fields!",
    loginSuccess: "Login successful!",
    invalidCredentials: "Invalid email or password!",
  },
  uz: {
    success: "Siz muvaffaqiyatli obuna bo‘ldingiz!",
    duplicate: "Bu email allaqachon obuna bo‘lgan!",
    serverError: "Server xatosi!",
    signupSuccess: "Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!",
    emailExists: "Bu email allaqachon mavjud!",
    fillAllFields: "Barcha maydonlarni to‘ldiring!",
    loginSuccess: "Kirish muvaffaqiyatli!",
    invalidCredentials: "Email yoki parol noto‘g‘ri!",
  },
  ru: {
    success: "Вы успешно подписались!",
    duplicate: "Этот email уже подписан!",
    serverError: "Ошибка сервера!",
    signupSuccess: "Вы успешно зарегистрированы!",
    emailExists: "Этот email уже используется!",
    fillAllFields: "Заполните все поля!",
    loginSuccess: "Вход выполнен успешно!",
    invalidCredentials: "Неверный email или пароль!",
  },
};

// ✅ Email saqlash (Notify Me)
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  let language = req.headers["accept-language"]?.split(",")[0] || "en";

  if (!messages[language]) language = "en";
  if (!email) {
    return res.status(400).json({ message: messages[language].fillAllFields });
  }

  const lowerCaseEmail = email.toLowerCase();

  let emails = [];
  if (fs.existsSync(emailsFile)) {
    const fileData = fs.readFileSync(emailsFile, "utf8");
    emails = fileData ? JSON.parse(fileData) : [];
  }

  if (emails.some((entry) => entry.email.toLowerCase() === lowerCaseEmail)) {
    return res.status(400).json({ message: messages[language].duplicate });
  }

  const newEntry = {
    id: emails.length + 1,
    email: lowerCaseEmail,
    date: new Date().toLocaleString(),
  };

  emails.push(newEntry);

  try {
    fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));
  } catch (error) {
    return res.status(500).json({ message: messages[language].serverError });
  }

  res.json({ message: messages[language].success });
});

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
  const data = await fs.promises.readFile(usersFile, "utf8");
  users = JSON.parse(data);
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

// ✅ Kirish (Login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let language = req.headers["accept-language"] || "en";

  if (!messages[language]) {
    language = "en";
  }

  if (!email || !password) {
    return res.status(400).json({ message: messages[language].fillAllFields });
  }

  const lowerCaseEmail = email.toLowerCase();

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  const user = users.find((user) => user.email === lowerCaseEmail);
  if (!user) {
    return res
      .status(400)
      .json({ message: messages[language].invalidCredentials });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: messages[language].invalidCredentials });
  }

  // ✅ JWT Token yaratish
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });

  // ✅ Foydalanuvchi ma'lumotlarini ham qaytaramiz
  res.json({
    message: messages[language].loginSuccess,
    token,
    user: {
      id: user.id,
      name: user.name, // Foydalanuvchi ismi
      email: user.email,
    },
  });
});

app.get("/", (req, res) => {
  res.send("Backend ishlayapti! 🚀");
});

// 🚀 Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
