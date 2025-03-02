import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Comingsoon from "../pages/Comingsoon";
import EndTime from "../components/Endtime";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./PageNotFound";

const SupportedLanguages = ["en", "uz", "ru"]; // ✅ Qo‘llab-quvvatlangan tillar ro‘yxati

const LanguageRedirect = () => {
  let { lang } = useParams();
  if (!SupportedLanguages.includes(lang)) {
    return <Navigate to="/comingsoon/en" replace />;
  }
  return null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/comingsoon/en" replace />} />
        <Route path="/:lang" element={<LanguageRedirect />} />
        <Route path="/comingsoon/:lang" element={<Comingsoon />} />
        <Route path="/endtime/:lang" element={<EndTime />} />
        <Route path="/signup/:lang" element={<Signup />} />
        <Route path="/login/:lang" element={<Login />} />
        <Route path="/dashboard/:lang" element={<Dashboard />} />
        <Route path="/notfound/:lang" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound/en" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
