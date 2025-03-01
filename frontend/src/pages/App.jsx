import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import Dashboard from "../pages/Dashboard";
  import EndTime from "../components/Endtime";
  import Signup from "./Signup";
  
  const App = () => {
    return (
      <Router>
        <Routes>
          {/* Asosiy sahifani dashboardga yo‘naltiramiz */}
          <Route path="/" element={<Navigate to="/dashboard/en" replace />} />
          <Route path="/:lang" element={<Navigate to="/dashboard/:lang" replace />} />
  
          {/* Sahifalar */}
          <Route path="/dashboard/:lang" element={<Dashboard />} />
          <Route path="/endtime/:lang" element={<EndTime />} />
          <Route path="/signup/:lang" element={<Signup />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;
  