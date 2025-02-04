import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import LandingPages from "./Components/Landing/LandingPages";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
function App() {
  return (
    <>
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPages />
              <Footer />
            </>
          }
        />
        {/* Login Page Route */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        {/* Signup Page Route */}
        <Route
          path="/signup"
          element={
            <>
              <Navbar /> <Signup /> <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
