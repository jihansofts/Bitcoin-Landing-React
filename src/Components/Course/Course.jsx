import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiaLongArrowAltLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import { courses } from "../../Helper/Data";
import Model from "../Common/Model";
import Card from "../Common/Card";

const Course = () => {
  const [activeItem, setActiveItem] = useState("All Programs");
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const tabItems = ["All Programs", "Advanced", "Intermediate", "Beginner"];

  // **Filter & Sort Courses Based on Active Tab**
  const filteredCourses = courses
    .filter(
      (course) =>
        activeItem === "All Programs" || course.title.includes(activeItem)
    )
    .sort((a, b) => {
      const lastWordA = a.title.split(", ").pop(); // Get last word after last comma
      const lastWordB = b.title.split(", ").pop();

      const order = ["Beginner", "Intermediate", "Advanced"]; // Define sorting order
      return order.indexOf(lastWordA) - order.indexOf(lastWordB);
    });
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     setUser(result.user);
  //     toast.success("Login Successful!");
  //     onClose(false);
  //     navigator("/dashboard/course");
  //   } catch (error) {
  //     toast.error("Login Failed!", error.message);
  //   }
  // };
  const handleSlide = (direction) => {
    const currentIndex = tabItems.indexOf(activeItem);
    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = currentIndex === 0 ? tabItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === tabItems.length - 1 ? 0 : currentIndex + 1;
    }
    setActiveItem(tabItems[newIndex]);
  };

  return (
    <div className="w-full bg-bgPrimary py-10 overflow-hidden">
      {isOpen && (
        <div className="fixed bg-bgSecondary top-0 left-0 bg-opacity-30 w-full h-full max-sm:max-h-screen z-50">
          <Model onClose={setIsOpen} />
        </div>
      )}
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
                className={`cursor-pointer max-sm:text-[12px] ${
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
            exit={{ opacity: 0 }}>
            <Card
              // handleSingleCourse={handleGoogleSignIn}
              onOpenModal={setIsOpen}
              data={filteredCourses}
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleSlide("left")}
            className="text-[16px] bg-buttonColor cursor-pointer flex justify-center items-center w-16 h-16 rounded-full font-Inter font-semibold text-bgPrimary mt-10">
            <LiaLongArrowAltLeftSolid size={35} />
          </button>
          <button
            onClick={() => handleSlide("right")}
            className="text-[16px] border-2 cursor-pointer border-[#707070] flex justify-center items-center w-16 h-16 rounded-full font-Inter font-semibold text-white mt-10">
            <LiaArrowRightSolid size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
