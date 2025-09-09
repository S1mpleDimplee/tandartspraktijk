import logo from "./logo.svg";
import "./App.css";
import TandartsRegistratie from "./Registration/Registration";
import { useEffect, useState } from "react";
import NavbarHome from "./Navbars/Navbars/NavbarHome/NavbarHome";

// useEffect {

// }

function App() {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <>
      <div className="main-content-style">
        <NavbarHome />

        <TandartsRegistratie />
      </div>
    </>
  );
}
export default App;
