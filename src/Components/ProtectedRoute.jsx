import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
const ProtectedRoute = ({ children }) => {
  const { user, enrolledCourses, courseId } = useAuth();

  // If no user is logged in, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // If the user is not enrolled in any courses, show an alert and redirect
  if (enrolledCourses.length === 0 || !courseId) {
    // toast.error("Enroll in a course first!");
    return <Navigate to="/" replace />;
  }
  // If everything is fine, render the children (protected content)
  return children;
};

export default ProtectedRoute;
