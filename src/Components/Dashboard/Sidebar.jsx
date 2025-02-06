import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Toggle sidebar
  const [activeIndex, setActiveIndex] = useState(0); // Track active tab
  const completedLessons = [0, 2, 3]; // Completed lesson indices

  const tabItems = [
    "Introduction",
    "How can I start buying Bitcoin safely and securely?",
    "How does the fees work?",
    "Can I buy larger amounts or buy without an exchange account?",
    "How can I start buying Bitcoin safely and securely?",
    "How does the fees work?",
    "Can I buy larger amounts or buy without an exchange account?",
    "How can I start buying Bitcoin safely and securely?",
    "How does the fees work?",
    "How does the fees work?",
  ]; // Add more as needed

  return (
    <div className="w-80 h-screen bg-[#123C2E] rounded-2xl p-5 flex flex-col text-white">
      {/* Title & Progress Bar */}
      <h2 className="text-lg font-bold">
        5 Minute Bitcoin, Course 3, Advanced
      </h2>
      <div className="relative w-full h-2 bg-[#1F4C3A] rounded-full mt-3">
        <div className="absolute top-0 left-0 h-2 bg-[#A3F68A] w-[20%] rounded-full"></div>
      </div>
      <div className="w-full flex justify-between text-xs text-gray-300 mt-1">
        <span>20%</span>
        <span>100%</span>
      </div>

      {/* Course Dropdown */}
      <div
        className="bg-[#1F4C3A] flex items-center justify-between px-4 py-3 mt-5 rounded-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h4 className="text-white font-semibold">Course 01</h4>
          <p className="text-xs text-gray-300">
            Completed <span className="font-bold">1/12</span>
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </motion.div>
      </div>

      {/* Animated Course List with Scroll */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-2">
        <Tabs selectedIndex={activeIndex} onSelect={setActiveIndex}>
          <TabList className="mt-2 max-h-64 overflow-y-auto pr-2 space-y-1">
            {tabItems.map((item, index) => (
              <Tab
                key={index}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition
                  ${
                    activeIndex === index
                      ? "bg-[#228B53] text-white font-bold"
                      : "hover:bg-[#1F4C3A] text-gray-300"
                  }`}>
                <span className="flex items-center">
                  {index + 1}. {item}
                </span>
                {completedLessons.includes(index) && (
                  <FaCheckCircle className="text-[#A3F68A]" />
                )}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Sidebar;
