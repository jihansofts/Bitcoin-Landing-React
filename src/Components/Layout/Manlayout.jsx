import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
const Manlayout = () => {
  return (
    <div className="bg-bgPrimary py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-md:px-4">
        <Dashboard />
      </div>
    </div>
  );
};

export default Manlayout;
