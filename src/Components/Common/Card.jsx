import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Components/firebase";
import { useNavigate,useParams } from "react-router-dom"; // Use useNavigate instead of useHistory
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import Model from "./../Common/Model";
import CardShape from "../../assets/img/CardShape.png";
const Card = ({ course }) => {
  const {
    getTotalUsers,
    user,
    setCourseId,
    logout,
    enrolledCourses,
  } = useAuth();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [UserCount, setUserCount] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const { id } = useParams();
  // Handle course click (for enrolled courses)
  useEffect(() => {
    const fetchUsers = async () => {
      const count = await getTotalUsers();
      setUserCount(count);
    };

    fetchUsers();
  }, []);

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
        toast.error("Course not found!");
        return;
      }
      const courseData = courseSnap.data();
      const totalLessons = courseData.totalLessons || 0; // Default to 0 if not set
      // Check if the user is already enrolled in this course
      const userCourseSnap = await getDoc(userCourseRef);
      if (userCourseSnap.exists()) {
        toast.info("You are already enrolled in this course.");
        console.log(id, "id");
        navigate(`/dashboard/course/${id}`);
        return;
      }
      // If not enrolled, enroll the user in the course
      await setDoc(userCourseRef, {
        progressPercentage: 0,
        completedLessons: [],
        totalLessons: totalLessons, // Use the fetched totalLessons value
      });
      toast.success("Enrollment successful!");
      navigate(`/dashboard/course/${id}`);
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Enrollment failed. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-12 max-xl:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-12 max-sm:grid-cols-1 gap-8 mt-20">
      {isOpen && (
        <div className="fixed bg-bgSecondary top-0 left-0 bg-opacity-30 w-full h-full max-sm:max-h-screen z-50">
          <Model selectedCourseId={selectedCourseId} onClose={setIsOpen} />
        </div>
      )}
      <div
        key={course.id}
        className="col-span-12 max-xl:col-span-12 max-lg:col-span-12 max-md:col-span-12 max-sm:col-span-1 relative flex flex-col" // Add flex and flex-col here
      >
        <img
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-t-2xl"
          src={course.image}
          alt="Course"
        />
        <div className="relative bg-bgSecondary flex flex-col items-start text-start py-6 px-5 rounded-b-2xl font-Inter font-semibold overflow-hidden flex-grow">
          {" "}
          {/* Add flex-grow here */}
          <img
            className="absolute bottom-0 left-0 w-full h-auto z-0"
            src={CardShape}
            alt="Card Background"
          />
          <div className="relative z-10 flex flex-col h-full">
            {" "}
            {/* Add flex and h-full here */}
            <h3 className="text-white text-[26px]">{course.title}</h3>
            <p className="text-[16px] font-light text-white mt-4 flex-grow">
              {" "}
              {/* Add flex-grow here */}
              {course.description}
            </p>
            <div className="flex items-center justify-between w-full mt-4">
              <span className="text-[14px] flex gap-x-2 font-bold text-white">
                {UserCount}
                <h5>Participants</h5>
              </span>
              <span className="text-[14px] font-bold text-white">Free</span>
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
