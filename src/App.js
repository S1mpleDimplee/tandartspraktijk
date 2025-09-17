import "./App.css";
import TandartsRegistratie from "./Registration/Register/Registration";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarHome from "./Navbars/Navbars/NavbarHome/NavbarHome";
import Login from "./Registration/Login/Login";
import NavbarDashboard from "./Navbars/Navbars/NavbarPanel/NavbarDashboard";
import Sidebar from "./Navbars/Sidebar/Sidebar";
import DashboardPatient from "./Dashboards/DashboardPatient/Dashboard/DashboardPatient";
import Home from "./MainPages/Home/Home";
import Footer from "./Footer/Footer";
import DashboardTandarts from "./Dashboards/DashboardTandarts/Dashboard/DashboardTandarts";
import DentisTimetable from "./Dashboards/DashboardTandarts/Timetable/Timetable";

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  const [isPatientDashboard, setIsPatientDashboard] = useState(false);
  const patientDashboardUrls = ["/dashboard", "/dashboard-tandarts", "/dashboard/rooster"];

  const [currentRole, setCurrentRole] = useState(null);
  const nonLoggedInUrls = ["/", "/inloggen", "/registreren"];
  const isNonLoggedIn = nonLoggedInUrls.includes(location.pathname);

  const navigate = useNavigate();


  useEffect(() => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
    if (loggedInData) {
      setCurrentRole(parseInt(loggedInData.role));
    }
  }, []);

  useEffect(() => {
    setIsPatientDashboard(patientDashboardUrls.includes(location.pathname));
    checkIfUserIsLoggedIn();
  }, [location.pathname]);

  const checkIfUserIsLoggedIn = () => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
    if (!loggedInData && !isNonLoggedIn) {
      navigate("/inloggen");
    }
  };

  return (
    <div className="app-container">
      {/* Navbar at the top */}
      {isPatientDashboard ? <NavbarDashboard /> : <NavbarHome />}

      {/* Content area with sidebar and main content */}
      <div className="content-wrapper">
        {isPatientDashboard && <Sidebar />}

        {/* Main content area */}
        <main className={`main-content ${isPatientDashboard ? 'dashboard-main-content' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registreren" element={<TandartsRegistratie />} />
            <Route path="/inloggen" element={<Login />} />
            <Route path="/dashboard" element={currentRole === 0 ? <DashboardPatient /> : <DashboardTandarts />} />
            <Route path="/dashboard-tandarts" element={<DashboardTandarts />} />
            <Route path="/dashboard/rooster" element={<DentisTimetable />} />
            <Route path="*" element={<h1>404 - Pagina niet gevonden</h1>} />
          </Routes>
        </main>


      </div>
      <footer className="footer">
        {isPatientDashboard ? null : <Footer />}
      </footer>
    </div>
  );
}

// Main App component that provides the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;