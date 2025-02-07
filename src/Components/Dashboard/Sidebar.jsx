import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const completedLessons = [1, 2, 3];

  const tabItems = [
    "Introduction",
    "How can I start buying Bitcoin safely and securely?",
    "How does the fees work?",
    "Can I buy larger amounts or buy without an exchange account?",
    "What are the risks of buying Bitcoin?",
    "What are the best platforms for Bitcoin transactions?",
    "Understanding Bitcoin Wallets",
    "How does blockchain work?",
    "Bitcoin security tips",
    "Final thoughts & resources",
    "Conclusion",
    "FAQs",
    "References",
    "Testimonials",
    "Contact",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  return (
    <div className="w-80 bg-bgSecondary h-[750px] rounded-2xl p-5 flex flex-col text-white shadow-lg">
      {/* Title */}
      <h2 className="text-lg font-semibold">
        5 Minute Bitcoin, Course 3, Advanced
      </h2>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-bgPrimary rounded-full mt-3">
        <div className="absolute top-0 left-0 h-1 bg-buttonColor w-[20%] rounded-full"></div>
      </div>
      <div className="flex justify-between text-xs text-gray-300 mt-1">
        <span>20%</span>
        <span>100%</span>
      </div>

      {/* Course Dropdown */}
      <div
        className="bg-bgPrimary flex items-center justify-between px-4 py-3 mt-5 rounded-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h4 className="text-white font-semibold">Course 01</h4>
          <p className="text-xs text-gray-300">
            Completed <span className="font-bold">1/12</span>
          </p>
        </div>
        <motion.div
          className="text-buttonColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </motion.div>
      </div>

      {/* Lessons List with Scrollbar on the Right */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-2">
        <div className="bg-bgPrimary h-[650px] pl-4 pt-4 rounded-2xl px-4 ">
          {/* Scrollable Container */}
          <div className="max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
            {tabItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center mt-4 justify-between px-5 py-2 rounded-md cursor-pointer text-sm transition
                ${
                  activeIndex === index
                    ? "bg-bgSecondary mt-5 border-r-4 border-buttonColor text-[14px] text-white font-bold"
                    : "hover:bg-bgSecondary text-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}>
                <span className="flex  items-center">
                  {index + 1}. {item}
                </span>
                {completedLessons.includes(index) && (
                  <FaCheckCircle size={18} className="text-buttonColor" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
