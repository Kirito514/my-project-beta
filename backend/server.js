const messages = {
  en: {
    success: "You have successfully subscribed!",
    duplicate: "This email is already subscribed!",
    serverError: "Server error!",
  },
  uz: {
    success: "Siz muvaffaqiyatli obuna bo‘ldingiz!",
    duplicate: "Bu email allaqachon obuna bo‘lgan!",
    serverError: "Server xatosi!",
  },
  ru: {
    success: "Вы успешно подписались!",
    duplicate: "Этот email уже подписан!",
    serverError: "Ошибка сервера!",
  },
};

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const emailsFile = "emails.json";

// ✅ Emailni JSON faylga yozish
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  let language = req.headers["accept-language"] || "en"; // 📌 Tilni olish (default: English)

  // ⚠️ Xato til kodi bo‘lsa, `en` qilib qo‘yamiz
  if (!messages[language]) {
    language = "en";
  }

  if (!email) {
    return res.status(400).json({ message: messages[language].serverError });
  }

  const lowerCaseEmail = email.toLowerCase(); // 📌 Katta-kichik harf farq qilmasligi uchun

  // 📌 JSON fayldan eski email listni o‘qish
  let emails = [];
  if (fs.existsSync(emailsFile)) {
    emails = JSON.parse(fs.readFileSync(emailsFile));
  }

  // 🔥 Takrorlangan emailni tekshirish
  if (emails.some((entry) => entry.email === lowerCaseEmail)) {
    return res.status(400).json({ message: messages[language].duplicate });
  }

  // ✅ Yangi email qo‘shish
  const newEmail = {
    id: emails.length + 1,
    email: lowerCaseEmail,
    date: new Date().toLocaleString(), // 📌 Sana va vaqtni qo'shish
  };
  emails.push(newEmail);
  fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));

  res.json({ message: messages[language].success });
});

// 🚀 Serverni ishga tushirish
app.listen(5000, () => console.log("Server running on port 5000"));
