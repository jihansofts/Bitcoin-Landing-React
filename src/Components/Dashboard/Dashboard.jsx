import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Course from "./Content";
import { db, auth } from "../../Components/firebase";
import Shape from "../../assets/img/shape.png";
import Shaperight from "../../assets/img/shaperight.png";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import SidebarMobile from "./SidebarMobile";
import { useParams } from "react-router-dom";
const Dashboard = () => {
  const { enrolledCourses } = useAuth();
  const { id } = useParams();
  const courseId = id;
  const [selectLesson, setSelectLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active lesson index
  const [userCourseData, setUserCourseData] = useState(null);
  // Fetch all lessons for a given course

  useEffect(() => {
  setLoading(true);
  if (!courseId) return;

  const lessonsRef = collection(db, "course", courseId, "lessons");

  const unsubscribe = onSnapshot(lessonsRef, (snapshot) => {
    const lessonsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort lessons numerically by the number in the question
    const sortedData = lessonsData.sort((a, b) => {
      const aNumber = parseInt(a.question.match(/\d+/)?.[0] || Infinity, 10);
      const bNumber = parseInt(b.question.match(/\d+/)?.[0] || Infinity, 10);
      return aNumber - bNumber;
    });

    setLessons(sortedData);
    
    // ✅ Automatically select the first lesson when loaded
    if (sortedData.length > 0) {
      setSelectLesson(sortedData[0]); // Set first lesson
      setActiveIndex(0); // Set first lesson index
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, [courseId]);

  // useEffect(() => {
  //   setLoading(true);
  //   if (!courseId) return;

  //   const lessonsRef = collection(db, "course", courseId, "lessons");

  //   const unsubscribe = onSnapshot(lessonsRef, (snapshot) => {
  //     const lessonsData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     // Sort lessons by the numeric part of the title
  //     const sortedData = lessonsData.sort((a, b) => {
  //       const aNumber = parseInt(a.question.match(/\d+/)?.[0] || Infinity, 10); // Default to Infinity if no number is found
  //       const bNumber = parseInt(b.question.match(/\d+/)?.[0] || Infinity, 10); // Default to Infinity if no number is found
  //       return aNumber - bNumber;
  //     });
  //     setLessons(sortedData);
  //     setActiveIndex(0);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    const user = auth.currentUser;
    if (!user) return;
    const userCourseRef = doc(
      db,
      "users",
      user.uid,
      "enrolledCourses",
      courseId
    );
    // 🔹 Real-time listener for enrolled course data
    const unsubscribe = onSnapshot(userCourseRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserCourseData(docSnap.data()); // ✅ Update state in real-time
      }
    });
    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [courseId]);

  const handleLessonClick = (lesson, index) => {
    setSelectLesson(lesson);
    setActiveIndex(index);
  };

  const handleMarkAsComplete = async (lessonId) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Please log in first!");
    try {
      const userCourseRef = doc(
        db,
        "users",
        user.uid,
        "enrolledCourses",
        courseId
      );
      const userCourseSnap = await getDoc(userCourseRef);

      if (!userCourseSnap.exists()) toast.error("Enroll in this course first!");
      let { completedLessons = [], totalLessons = 0 } = userCourseSnap.data();
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }
      const progressPercentage = (completedLessons.length / totalLessons) * 100;
      await updateDoc(userCourseRef, { completedLessons, progressPercentage });
      toast.success("Lesson marked as complete!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleUndo = async (lessonId) => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first!");

    try {
      const userCourseRef = doc(
        db,
        "users",
        user.uid,
        "enrolledCourses",
        courseId
      );
      const userCourseSnap = await getDoc(userCourseRef);

      if (!userCourseSnap.exists()) return null;

      let { completedLessons = [], totalLessons = 0 } = userCourseSnap.data();
      // Remove the lesson from completed list
      completedLessons = completedLessons.filter((id) => id !== lessonId);
      // ✅ Round the percentage value to the nearest integer
      const progressPercentage = Math.round(
        (completedLessons.length / totalLessons) * 100
      );
      // ✅ Update Firestore with rounded percentage
      await updateDoc(userCourseRef, { completedLessons, progressPercentage });
      toast.warn(`Progress updated: ${progressPercentage}%`);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="relative w-full z-0 bg-bgPrimary py-16 max-md:py-14 max-sm:py-8 overflow-hidden h-auto">
      <div className="absolute z-10 w-[330px] max-md:w-[200px] max-lg:w-[300px] top-[-40px] left-0">
        <img className="w-full z-0" src={Shape} alt="Left Shape" />
      </div>
      <div className="container  mx-auto px-4 max-md:px-4">
        <div className="grid grid-cols-12  max-lg:grid-cols-12 max-lg:grid-rows-2 max-md:grid-rows-1 gap-6">
          {/* Sidebar */}
          <div className="row-span-1 z-50 col-span-4 max-lg:hidden max-xl:col-span-4 max-2xl:col-span-4 max-lg:col-span-4">
            {/* Sidebar for larger screens */}
            <div className="">
              <Sidebar
                data={enrolledCourses}
                loading={loading}
                onLessonClick={handleLessonClick}
                lessons={lessons}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                userCourseData={userCourseData}
              />
            </div>
            {/* Sidebar for smaller screens */}
          </div>
          {/* Content Area */}
          <div className="row-span-1 z-50 relative col-span-8 max-xl:col-span-8 max-2xl:col-span-8 max-lg:col-span-full">
            <div className="lg:hidden z-50">
              <SidebarMobile
                data={enrolledCourses}
                loading={loading}
                onLessonClick={handleLessonClick}
                lessons={lessons}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                userCourseData={userCourseData}
              />
            </div>
            <Course
              lesson={selectLesson}
              lessons={lessons}
              setSelectLesson={setSelectLesson}
              userCourseData={userCourseData}
              completeLesson={handleMarkAsComplete}
              handleUndo={handleUndo}
              setActiveIndex={setActiveIndex}
            />
          </div>
        </div>
      </div>
      <div className="absolute z-10 w-[330px] max-md:w-[200px] max-lg:w-[300px] right-0 bottom-[200px]">
        <img className="w-full" src={Shaperight} alt="Left Shape" />
      </div>
      <div className="absolute z-10 w-[330px] max-md:w-[200px] max-lg:w-[300px] bottom-[-200px] left-0">
        <img className="w-full" src={Shape} alt="Left Shape" />
      </div>
    </div>
  );
};

export default Dashboard;
