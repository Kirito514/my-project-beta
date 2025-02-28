import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EndTime from "../components/Endtime"; 

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/"></Link>
                {/* Agar boshqa sahifalar bo‘lsa, shu joyga qo‘shing */}
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/endtime" element={<EndTime />} /> {/* EndTime sahifasini qo'shish */}
            </Routes>
        </Router>
    );
};

export default App;
