import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"; // ✅ O‘xshash ikoncha
import "./PageNotFound.css";

const NotFound = () => {
  let { lang } = useParams(); // 🌍 URL-dan tilni olish
  const SupportedLanguages = ["en", "uz", "ru"];

  // ❌ Agar URL-dagi til noto‘g‘ri bo‘lsa, standart "en" ga yo‘naltiramiz
  if (!SupportedLanguages.includes(lang)) {
    lang = "en";
  }

  return (
    <div className='notFound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={`/comingsoon/${lang}`} className='home-link'>
        <i class='fa-regular fa-circle-left'></i>Back to home
      </Link>{" "}
      {/* ✅ Foydalanuvchi tanlagan tilga yo‘naltirish */}
    </div>
  );
};

export default NotFound;
