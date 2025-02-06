import React from "react";
import Sidebar from "./Sidebar";
import Course from "./Content";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-bgPrimary py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-md:px-4">
        <Sidebar onLogout={logout}>
          <Course />
        </Sidebar>
      </div>
    </div>
  );
};

export default Dashboard;
