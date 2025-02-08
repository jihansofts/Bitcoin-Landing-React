import React from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Components/firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CardShape from "../../assets/img/CardShape.png";
const Card = ({ image, onOpenModal, courses, loading }) => {
  const navigator = useNavigate();
  const enrollCourse = async (courseId, totalLessons) => {
    const user = auth.currentUser; // Get logged-in user
    if (!user) {
      toast.error("Please login to enroll in a course!");
      setTimeout(() => {
        onOpenModal(true);
      }, 2000);
    }
    try {
      const userCourseRef = doc(
        db,
        "users",
        user.uid,
        "enrolledCourses",
        courseId
      );
      const docSnap = await getDoc(userCourseRef);
      console.log(docSnap.exists());
      if (docSnap.exists()) {
        toast.info("You are already enrolled!");
        navigator("/dashboard/course");
        return; // Prevent duplicate enrollment
      }
      // Initialize user progress
      await setDoc(userCourseRef, {
        progressPercentage: 0,
        completedLessons: [],
        totalLessons: totalLessons,
      });
      toast.success("Enrollment successful!");
      navigator("/dashboard/course");
      onOpenModal(false);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      {loading ? (
        <div className="flex items-center justify-center col-span-3">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-buttonColor"></div>
          <span className="ml-2 text-buttonColor">Loading...</span>
        </div>
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="col-span-1 relative">
            {/* Card Image */}
            <img
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl"
              src={image}
              alt="Course"
            />
            {/* Content Area with CardShape Background */}
            <div className="relative bg-bgSecondary flex flex-col items-start text-start py-6 px-5 sm:py-8 sm:px-6 md:py-10 md:px-7 rounded-b-2xl font-Inter font-semibold overflow-hidden">
              {/* CardShape Background */}
              <img
                className="absolute bottom-0 left-0 w-full h-auto z-0"
                src={CardShape}
                alt="Card Background"
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="max-w-[400px]">
                  <h3 className="text-white text-[26px] max-xl:text-[20px] max-lg:text-[24px] max-sm:text-[28px] max-md:text-[32px] font-Inter font-semibold">
                    {course.title}
                  </h3>
                </div>
                <p className="text-[14px] sm:text-[16px] font-Inter font-light text-white mt-4 sm:mt-5">
                  {course.description}
                </p>
                <div className="flex items-center justify-between w-full mt-4 sm:mt-5">
                  <span className="text-[14px] sm:text-[16px] md:text-[18px] font-Inter font-bold text-white">
                    Participants
                  </span>
                  <span className="text-[14px] sm:text-[16px] md:text-[18px] font-Inter font-bold text-white">
                    Free
                  </span>
                </div>
                <button
                  onClick={() => enrollCourse(course.id, course.totalLessons)}
                  className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                  Take Course
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-white">
          No courses available
        </p>
      )}
    </div>
  );
};

export default Card;
