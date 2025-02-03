import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shape from "../../assets/img/shape.png";
import Shaperigjt from "../../assets/img/shaperight.png";
import CardShape from "../../assets/img/CardShape.png";
import Card1 from "../../assets/img/Card1.png";
import Card2 from "../../assets/img/Card2.png";
import Card3 from "../../assets/img/Card3.png";
import Card from "../Common/Card";
const Course = () => {
  const [activeItem, setActiveItem] = useState("All Programs");

  const tabItems = [
    { id: 1, name: "All Programs" },
    { id: 2, name: "Advanced" },
    { id: 3, name: "Intermediate" },
    { id: 4, name: "Beginner" },
  ];
  const courses = [
    {
      id: 1,
      image: Card1,
      title: "5 Minute Bitcoin, Course 3, Advanced",
      description:
        "Learn about bitcoin and start earning from it. This course will help you a lot.",
    },
    {
      id: 2,
      image: Card2,
      title: "5 Minute Bitcoin, Course 2, Intermediate",
      description:
        "Learn about bitcoin and start earning from it. This course will help you a lot.",
    },
    {
      id: 3,
      image: Card3,
      title: "5 Minute Bitcoin, Course 1, Beginner",
      description:
        "Learn about bitcoin and start earning from it. This course will help you a lot.",
    },
  ];
  return (
    <div className="w-full relative bg-bgPrimary py-10 overflow-hidden">
      <div className="absolute w-100 h-100 top-[-50px] left-0">
        <img className="w-full" src={Shape} alt="" />
      </div>
      <div className="container mx-auto text-center">
        <div>
          <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
            Course
          </h4>
          <h2 className="relative text-[50px] lg:text-[72px] font-Inter text-white font-bold">
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
                  <Card data={courses} />
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
        </div>
      </div>
      <div className="absolute w-100 h-100 bottom-0 right-0">
        <img className="w-full" src={Shaperigjt} alt="" />
      </div>
    </div>
  );
};

export default Course;
