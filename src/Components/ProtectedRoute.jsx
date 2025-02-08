import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user, enrolledCourses } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (enrolledCourses.length === 0) {
    return <Navigate to="/dashboard/course" replace />;
  }
  return children;
};

export default ProtectedRoute;
