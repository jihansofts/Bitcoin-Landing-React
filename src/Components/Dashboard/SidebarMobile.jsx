import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const SidebarMobile = ({
  data,
  lessons,
  loading,
  onLessonClick,
  activeIndex,
  userCourseData,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  const handleLessonClick = (lesson, index) => {
    onLessonClick(lesson, index);
    setIsMobileSidebarOpen(false); // Close on mobile after clicking
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden cursor-pointer top-5 left-5 text-buttonColor  z-50"
        onClick={() => setIsMobileSidebarOpen(true)}>
        <FaChevronRight size={25} />
      </button>
      {/* Overlay when Sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-bgPrimary opacity-50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileSidebarOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 w-[300px] h-full bg-bgSecondary rounded-r-2xl p-5 flex flex-col text-white shadow-lg z-50 lg:relative lg:w-full lg:h-[750px]`}>
        {/* Close Button (Mobile) */}
        <button
          className="lg:hidden cursor-pointer absolute top-5 right-5 text-buttonColor text-2xl"
          onClick={() => setIsMobileSidebarOpen(false)}>
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold">
          {data?.[0]?.title || "Course dashboard"}
        </h2>

        {/* Progress Bar */}
        <div className="relative w-full h-1 bg-bgPrimary rounded-full mt-3">
          <div
            className="absolute top-0 left-0 h-1 rounded-full"
            style={{
              width: `${userCourseData?.progressPercentage || 0}%`,
              backgroundColor: "#a3dc2f",
            }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-300 mt-1">
          <span>{`${userCourseData?.progressPercentage || 0}%`}</span>
          <span>100%</span>
        </div>

        {/* Divider */}
        <div className="w-full flex gap-x-2 items-center mt-8">
          <div className="flex-1 h-[2px] bg-bgPrimary"></div>
          <p className="bg-bgPrimary w-2 h-2 rounded-full"></p>
          <div className="flex-1 h-[2px] bg-bgPrimary"></div>
        </div>
        {/* Course Dropdown */}
        <div
          className="bg-bgPrimary flex items-center justify-between px-4 py-3 mt-5 rounded-xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <div>
            <h4 className="text-white font-semibold">Course 01</h4>
            <p className="text-xs text-gray-300">
              <span className="font-bold">
                {userCourseData?.completedLessons.length || 0}/
                {data?.[0]?.totalLessons || 0}
              </span>
            </p>
          </div>
          <motion.div
            className="text-buttonColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}>
            {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </motion.div>
        </div>

        {/* Lessons List */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-2xl mt-2">
          <div className="bg-bgPrimary h-[500px] pl-4 pt-4 px-4">
            <div className="max-h-[450px] overflow-y-auto custom-scrollbar customM-scrollbar pr-2">
              <ul className="space-y-3">
                {!loading &&
                  lessons &&
                  lessons.map((lesson, index) => (
                    <li
                      key={lesson.id}
                      className={`flex justify-between items-center px-4 py-4 mr-3 rounded-lg cursor-pointer transition 
                      ${
                        activeIndex === index
                          ? "bg-bgSecondary border-r-5 border-buttonColor text-white"
                          : "hover:bg-bgSecondary text-gray-300"
                      }`}
                      onClick={() => handleLessonClick(lesson, index)}>
                      {lesson.question}
                      {userCourseData?.completedLessons?.includes(lesson.id) ? (
                        <span className="w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full">
                          <FaCheckCircle className="text-[#5EDD60]" size={18} />
                        </span>
                      ) : null}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SidebarMobile;
