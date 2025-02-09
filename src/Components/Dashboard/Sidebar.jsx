import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
const Sidebar = ({
  lessons,
  loading,
  onLessonClick,
  activeIndex,
  courseTitle,
  totalLessons,
  userCourseData,
}) => {
  console.log(userCourseData, "users");
  const [isOpen, setIsOpen] = useState(true);
  const completedLessons = [0, 2]; // Indices of completed lessons
  const handleLessonClick = (lesson, index) => {
    onLessonClick(lesson, index); // Pass the selected lesson and index to the parent
  };
  return (
    <div className="w-full bg-bgSecondary h-[750px] rounded-2xl p-5 flex flex-col text-white shadow-lg">
      {/* Title */}
      <h2 className="text-lg font-semibold">
        {courseTitle || "Course dashboard"}
      </h2>
      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-bgPrimary rounded-full mt-3">
        <div className="absolute top-0 left-0 h-1 bg-buttonColor w-[20%] rounded-full"></div>
      </div>
      <div className="flex justify-between text-xs text-gray-300 mt-1">
        <span>{userCourseData?.progressPercentage || 0}</span>
        <span>100%</span>
      </div>
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
              {userCourseData?.completedLessons.length || 0}/{totalLessons || 0}
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
          {/* Scrollable Container */}
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
                          ? "bg-bgSecondary border-r-5 border-buttonColor text-white" // Active state
                          : "hover:bg-bgSecondary text-gray-300" // Default state
                      }`}
                    onClick={() => handleLessonClick(lesson, index)}>
                    {lesson.question}
                    {/* Icon with custom background */}
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
    </div>
  );
};

export default Sidebar;
