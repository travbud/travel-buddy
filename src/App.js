import React from "react";
import Navbar from "./demo/components/Navbar";
import VendorLandingPage from "./demo/components/VendorHome/VendorLandingPage";
import UserLandingPage from "./demo/components/UserHome/UserLandingPage";
import "./global.css";

function App() {
  return (
    <>
      <Navbar />
      <VendorLandingPage />

      {/*<UserLandingPage />*/}
    </>
  );
}

export default App;
