import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiaLongArrowAltLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import { db } from "../../Components/firebase";
import { collection, getDocs } from "firebase/firestore";
import Card1 from "../../assets/img/Card1.png";
import Model from "../Common/Model";
import Card from "../Common/Card";
// Store courses
const Course = () => {
  const [courses, setCourses] = useState([]);
  const [activeItem, setActiveItem] = useState("All Programs");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const tabItems = ["All Programs", "Advanced", "Intermediate", "Beginner"];
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Start loading
      try {
        const querySnapshot = await getDocs(collection(db, "course"));
        if (querySnapshot.empty) {
          console.log("No documents found");
        } else {
          console.log(
            "Fetched Documents:",
            querySnapshot.docs.map((doc) => doc.data())
          );
        }
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCourses();
  }, []);

  // **Filter & Sort Courses Based on Active Tab**
  const filteredCourses = courses
    .filter(
      (course) =>
        activeItem === "All Programs" || course.category === activeItem
    )
    .sort((a, b) => {
      const order = ["Beginner", "Intermediate", "Advanced"];
      return order.indexOf(a.category) - order.indexOf(b.category);
    });

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
              image={Card1}
              loading={loading}
              courses={courses}
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
