import { Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar/Navbar";
import LandingPages from "./Components/Landing/LandingPages";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard"; // Dashboard Page

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <ToastContainer position="top-center" autoClose={2000} />
              <LandingPages />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <ToastContainer position="top-center" autoClose={2000} />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <ToastContainer position="top-center" autoClose={2000} />
              <Signup />
              <Footer />
            </>
          }
        />

        {/* 🔐 Protected Route (Only accessible if logged in) */}
        <Route
          path="/dashboard/course/:courseId"
          element={
            <ProtectedRoute>
              <ToastContainer position="top-center" autoClose={2000} />
              <Navbar />
              <Dashboard /> {/* 🔹 Pass courseId inside Dashboard */}
              <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
