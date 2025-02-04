import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiaLongArrowAltLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import Shape from "../../assets/img/shape.png";
import { courses } from "../../Helper/Data";
import Card from "../Common/Card";
const Course = () => {
  const [activeItem, setActiveItem] = useState("All Programs");
  const tabItems = [
    { id: 1, name: "All Programs" },
    { id: 2, name: "Advanced" },
    { id: 3, name: "Intermediate" },
    { id: 4, name: "Beginner" },
  ];

  return (
    <div className="w-full relative bg-bgPrimary py-10 overflow-hidden">
      <div className="absolute w-100 h-100 top-[-50px] left-0">
        <img className="w-full" src={Shape} alt="" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <div>
          <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
            Course
          </h4>
          <h2 className="relative text-[60px] max-lg:text-[50px] max-md:text-[40px] font-Inter text-white font-bold">
            Enroll To Our{" "}
            <span className="relative inline-block group">
              <span className="relative z-10">Courses</span>
              <span className="absolute left-0 bottom-5 w-full h-[35px] bg-bgSecondary opacity-50 z-0"></span>
            </span>
          </h2>
        </div>
        <div className="w-full mt-5 text-center">
          <ul className="flex items-center justify-center space-x-16 max-xl:space-x-10 max-sm:space-x-5">
            {tabItems.map((item) => (
              <li
                key={item.id}
                className={`relative font-Inter font-medium cursor-pointer ${
                  activeItem === item.name
                    ? "text-buttonColor font-bold text-[18px] max-md:text-[16px]"
                    : "text-[#689D30] font-medium text-[16px] max-md:text-[12px]"
                }`}
                onClick={() => setActiveItem(item.name)}>
                {item.name}
                {activeItem === item.name && (
                  <motion.span
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-buttonColor rounded-sm"
                    layoutId="activeItem"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
          <div>
            <AnimatePresence>
              {activeItem === "All Programs" && <Card data={courses} />}
            </AnimatePresence>
            <AnimatePresence>
              {activeItem === "Advanced" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <Card data={Data} />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeItem === "Intermediate" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <Card data={courses} />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeItem === "Beginner" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <Card data={courses} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <button className="bg-buttonColor mr-3 text-bgPrimary py-4 px-4 cursor-pointer rounded-full font-Inter font-semibold hover:bg-opacity-90 transition-all mt-10">
              <LiaLongArrowAltLeftSolid size={20} />
            </button>
            <button className=" mr-3 text-bgPrimary py-4 px-4 cursor-pointer border-2 border-[#707070] rounded-full font-Inter font-semibold hover:bg-opacity-90 transition-all mt-10">
              <LiaArrowRightSolid color="#ffffff" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
