import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getCourseId } from "../Helper/localStorage";

const ProtectedRoute = ({ children }) => {
  const { user, enrolledCourses } = useAuth();
  const courseId = getCourseId.getCourseId(); // Retrieve from localStorage

  // If no user is logged in, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is not enrolled in any courses, check localStorage for access
  if (enrolledCourses.length === 0 && !courseId) {
    return <Navigate to="/" replace />;
  }
  // If everything is fine, render the children (protected content)
  return children;
};

export default ProtectedRoute;
