import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
const PopModelDashboard = () => {
  const { user, courseId } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 max-sm:top-[-12px] left-0 max-sm:left-[-5px] w-full h-full flex items-center justify-center z-50">
      <div className="relative bg-bgPrimary w-[90%] max-w-2xl md:max-w-4xl rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-gray-700">
          <IoCloseSharp size={24} />
        </button>
        {/* Left Column (Form) */}
        <h1 className="text-2xl max-sm:text-xl font-bold text-white">
          <span className="text-buttonColor">Success</span>, Now go to dashboard
        </h1>
        <button className="text-bgPrimary text-[24px] font-Inter font-bold">
          Go
        </button>
        {/* Right Column (Image) */}
      </div>
    </div>
  );
};

export default PopModelDashboard;
