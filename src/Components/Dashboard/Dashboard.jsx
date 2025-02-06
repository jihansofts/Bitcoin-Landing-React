import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return <Sidebar onLogout={logout} />;
};

export default Dashboard;
