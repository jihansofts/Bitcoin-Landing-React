import React from "react";
import { IoCloseSharp } from "react-icons/io5";
const Model = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <IoCloseSharp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Model;
