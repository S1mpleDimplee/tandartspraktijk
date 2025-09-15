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
import SidebarPatiënt from "./Navbars/Sidebars/SidebarPatient/SidebarPatient";
import DashboardPatient from "./DashboardPatient/Dashboard/DashboardPatient";
import Home from "./MainPages/Home/Home";
import Footer from "./Footer/Footer";

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  const [isPatientDashboard, setIsPatientDashboard] = useState(false);
  const patientDashboardUrls = ["/dashboard"];

  const navigate = useNavigate();

  useEffect(() => {
    setIsPatientDashboard(patientDashboardUrls.includes(location.pathname));
    checkIfUserIsLoggedIn();
  }, [location.pathname]);

  const checkIfUserIsLoggedIn = () => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
    if (!loggedInData) {
      navigate("/inloggen");
    }
  };

  return (
    <div className="app-container">
      {/* Navbar at the top */}
      {isPatientDashboard ? <NavbarDashboard /> : <NavbarHome />}

      {/* Content area with sidebar and main content */}
      <div className="content-wrapper">
        {isPatientDashboard && <SidebarPatiënt />}

        {/* Main content area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registreren" element={<TandartsRegistratie />} />
            <Route path="/inloggen" element={<Login />} />
            <Route path="/dashboard" element={<DashboardPatient />} />
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