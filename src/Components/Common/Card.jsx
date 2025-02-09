import React from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Components/firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import CardShape from "../../assets/img/CardShape.png";

const Card = ({ image, onOpenModal, courses, loading }) => {
  const { user, courseId, setCourseId } = useAuth(); // Get `courseId` from AuthContext
  const navigator = useNavigate();

  const handleCourseClick = (selectedCourseId) => {
    if (user) {
      if (selectedCourseId) {
        navigator(`/dashboard/course/${courseId}`); // 🔥 Go to dashboard if enrolled
      }
    } else {
      onOpenModal(true); // Show login modal
    }
  };
  const enrollCourse = async (selectedCourseId, totalLessons) => {
    if (!user) {
      setTimeout(() => {
        onOpenModal(true);
      }, 1000);
      return;
    }
    try {
      const userCourseRef = doc(
        db,
        "users",
        user.uid,
        "enrolledCourses",
        selectedCourseId
      );
      const docSnap = await getDoc(userCourseRef);
      if (docSnap.exists()) {
        setCourseId(selectedCourseId); // 🔥 Update Context with new courseId
        navigator(`/dashboard/course/${selectedCourseId}`);
        return;
      }
      await setDoc(userCourseRef, {
        progressPercentage: 0,
        completedLessons: [],
        totalLessons: totalLessons,
      });
      toast.success("Enrollment successful!");
      setCourseId(selectedCourseId); // 🔥 Set new `courseId` in context
      navigator(`/dashboard/course/${selectedCourseId}`);
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
            <img
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl"
              src={image}
              alt="Course"
            />
            <div className="relative bg-bgSecondary flex flex-col items-start text-start py-6 px-5 rounded-b-2xl font-Inter font-semibold overflow-hidden">
              <img
                className="absolute bottom-0 left-0 w-full h-auto z-0"
                src={CardShape}
                alt="Card Background"
              />
              <div className="relative z-10">
                <h3 className="text-white text-[26px]">{course.title}</h3>
                <p className="text-[14px] font-light text-white mt-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between w-full mt-4">
                  <span className="text-[14px] font-bold text-white">
                    Participants
                  </span>
                  <span className="text-[14px] font-bold text-white">Free</span>
                </div>

                {/* ✅ Dynamic Button Based on Enrollment */}
                {courseId === course.id ? (
                  <button
                    onClick={() => handleCourseClick(course.id)}
                    className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => enrollCourse(course.id, course.totalLessons)}
                    className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                    Take Course
                  </button>
                )}
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
