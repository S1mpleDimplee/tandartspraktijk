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
    <NavbarHome/>
    
      <TandartsRegistratie />
    </>
  );
}
export default App;
