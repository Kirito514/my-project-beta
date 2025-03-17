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
import DashboardContent from "../components/DashboardContent"; // 🔥 Dashboard'ning faqat content qismi
import NotFound from "./PageNotFound";
import Layout from "../components/Layout"; // 🔥 Yangi Layout
import { LoadingProvider, useLoading } from "../context/LoadingContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Chat } from "./Chat";
import Homepage from "../pages/Homepage";

const SupportedLanguages = ["en", "uz", "ru"];

const LanguageRedirect = () => {
  let { lang } = useParams();
  if (!SupportedLanguages.includes(lang)) {
    return <Navigate to="/comingsoon/en" replace />;
  }
  return null;
};

const AppRoutes = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LoadingSpinner />}
      <Routes>
        <Route path="/" element={<Navigate to="/comingsoon/en" replace />} />
        <Route path="/:lang" element={<LanguageRedirect />} />
        <Route path="/home/:lang" element={<Homepage />} />
        <Route path="/comingsoon/:lang" element={<Comingsoon />} />
        <Route path="/endtime/:lang" element={<EndTime />} />
        <Route path="/signup/:lang" element={<Signup />} />
        <Route path="/login/:lang" element={<Login />} />

        {/* 🔥 Layout ichida Dashboard va boshqa sahifalar */}
        <Route path="/dashboard/:lang" element={<Layout />}>
          <Route index element={<DashboardContent />} /> {/* 🔥 Dashboard sahifasi */}
          <Route path="settings" element={<h1>Settings Page</h1>} />
          <Route path="chat" element={<Chat/>} />
        </Route>

        <Route path="/notfound/:lang" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound/en" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LoadingProvider>
  );
};

export default App;
