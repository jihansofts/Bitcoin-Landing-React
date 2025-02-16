import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Components/firebase";
import { useNavigate,useParams } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useAuth } from "../../Context/AuthContext";
import Model from "./../Common/Model";
import CardShape from "../../assets/img/CardShape.png";
const Card = ({ course }) => {
  const {
    user,
    setCourseId,
    logout,
    enrolledCourses,
  } = useAuth();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  // const [UserCount, setUserCount] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const { id } = useParams();
  // Handle course click (for enrolled courses)
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const count = await getTotalUsers();
  //     setUserCount(count);
  //   };

  //   fetchUsers();
  // }, []);

  const handleCourseClick = (clickedCourseId) => () => {
    navigate(`/dashboard/course/${clickedCourseId}`);
  };

  const enrollCourse = async (selectedCourseId) => {
    setSelectedCourseId(selectedCourseId);
    try {
      setCourseId(selectedCourseId);
      // Check if the user is authenticated
      if (!user) {
        setIsOpen(true); // Show login modal if user is not authenticated
        return;
      }

      // Reference to the user's enrolled courses subcollection in Firestore
      const userCourseRef = doc(
        db,
        "users", // Collection name
        user.uid, // Document ID (user ID)
        "enrolledCourses", // Subcollection name
        selectedCourseId // Document ID within subcollection
      );

      const userCourseSnapBeforeEnrollAttempt = await getDoc(userCourseRef, {
        source: "server",
      });

      const isExists = userCourseSnapBeforeEnrollAttempt.exists();

      if (!isExists) {
        await logout();
        setIsOpen(true); // Show login modal if user is not authenticated
        return;
      }

      // Fetch the course details to get totalLessons
      const courseRef = doc(db, "course", selectedCourseId);
      const courseSnap = await getDoc(courseRef);

      if (!courseSnap.exists()) {
        return;
      }
      const courseData = courseSnap.data();
      const totalLessons = courseData.totalLessons || 0; // Default to 0 if not set
      // Check if the user is already enrolled in this course
      const userCourseSnap = await getDoc(userCourseRef);
      if (userCourseSnap.exists()) {
        navigate(`/dashboard/course/${id}`);
        return;
      }
      // If not enrolled, enroll the user in the course
      await setDoc(userCourseRef, {
        progressPercentage: 0,
        completedLessons: [],
        totalLessons: totalLessons, // Use the fetched totalLessons value
      });
      navigate(`/dashboard/course/${id}`);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  return (
    <div className="flex mt-16">
      {isOpen && (
        <div className="fixed  bg-bgSecondary top-0 left-0 bg-opacity-30 w-full h-full max-sm:max-h-screen z-50">
          <Model selectedCourseId={selectedCourseId} onClose={setIsOpen} />
        </div>
      )}
      <div
        key={course.id}
        className="w-full relative flex flex-col" // Add flex and flex-col here
      >
        <img
          className="w-full h-80 max-xl-h-64  max-sm:h-64 max-md:h-80 max-lg:w-full max-lg:h-80  rounded-t-2xl"
          src={course.image}
          alt="Course"
        />
        <div className="relative bg-bgSecondary flex flex-col items-start text-start py-6 px-5 rounded-b-2xl font-Inter font-semibold overflow-hidden flex-grow">
          {" "}
          {/* Add flex-grow here */}
          <img
            className="absolute max-xl:object-cover bottom-0 left-0 w-full h-auto z-0"
            src={CardShape}
            alt="Card Background"
          />
          <div className="relative z-10 flex flex-col h-full">
            {" "}
            {/* Add flex and h-full here */}
            <h3 className="text-white text-[32px] font-semibold">{course.title}</h3>
            <p className="text-[18px] font-semibold text-white mt-4 flex-grow">
              {" "}
              {/* Add flex-grow here */}
              {course.description}
            </p>
            <div className="flex items-center justify-between w-full mt-4">
              {/* <span className="text-[14px] flex gap-x-2 font-bold text-white">
                
              </span> */}
              <span className="text-[18px] font-bold text-white"><span className=""></span>Free</span>
            </div>
            {user &&
            enrolledCourses.some(
              (enrolledCourse) => enrolledCourse.id === course.id
            ) ? (
              <button
                onClick={handleCourseClick(course.id)}
                className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => enrollCourse(course.id)}
                className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                Take Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
