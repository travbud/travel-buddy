import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./demo/routes/Home";
import Navbar from "./demo/components/Navbar";
import VendorLandingPage from "./demo/components/VendorHome/VendorLandingPage";
import "./global.css";

function App() {
  return (
    <>
      <Navbar />
      <VendorLandingPage />
    </>
  );
}

export default App;
