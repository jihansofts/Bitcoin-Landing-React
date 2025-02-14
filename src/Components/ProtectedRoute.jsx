import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, enrolledCourses } = useAuth();

  // If no user is logged in, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is not enrolled in any courses, check localStorage for access
  if (enrolledCourses.length === 0) {
    return <Navigate to="/" replace />;
  }
  // If everything is fine, render the children (protected content)
  return children;
};

export default ProtectedRoute;
