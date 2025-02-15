import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../Common/Card";
import { useAuth } from "../../Context/AuthContext";
// Store courses
const Course = () => {
  const { enrollData } = useAuth();
  const [activeItem, setActiveItem] = useState("All Programs");
  const tabItems = ["All Programs", "Advanced", "Intermediate", "Beginner"];

  const filteredData = enrollData
    .filter(
      (course) =>
        activeItem === "All Programs" || course.category === activeItem
    )
    .sort((a, b) => {
      const order = [, "Beginner", "Intermediate", "Advanced"];
      return order.indexOf(a.category) - order.indexOf(b.category);
    });

  return (
    <div className="w-full bg-bgPrimary py-10 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-[72px] max-sm:text-[42px] max-md:text-[40px] max-lg:text-[50px] max-xl:text-[60px]  font-Inter text-center font-bold leading-tight text-white">
          Enroll To Our <span className="text-buttonColor">Courses</span>
        </h2>
        {/* Tab Items */}
        <div className="w-full mt-5 text-center">
          <ul className="flex items-center justify-center space-x-10 max-md:space-x-8 max-sm:space-x-4">
            {tabItems.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer max-sm:text-[16px] ${
                  activeItem === item
                    ? "text-buttonColor font-bold"
                    : "text-[#689D30]"
                }`}
                onClick={() => setActiveItem(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Course Cards */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-x-5  mt-0 max-sm:mt-0">
            {filteredData.map((course, index) => (
              <Card key={index} course={course} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Course;
