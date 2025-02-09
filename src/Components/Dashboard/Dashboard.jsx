import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Course from "./Content";
import { db, auth } from "../../Components/firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { logout, courseId, courseTitle, totalLessons } = useAuth();
  const [selectLesson, setSelectLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active lesson index
  const [userCourseData, setUserCourseData] = useState(null);
  // Fetch all lessons for a given course
  useEffect(() => {
    if (!courseId) return;
    const lessonsRef = collection(db, "course", courseId, "lessons");
    const unsubscribe = onSnapshot(lessonsRef, (snapshot) => {
      const lessonsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId]);

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

      if (!userCourseSnap.exists()) toast.error("Enroll in this course first!");
      let { completedLessons = [], totalLessons = 0 } = userCourseSnap.data();
      completedLessons = completedLessons.filter((id) => id !== lessonId); // Remove lesson from completed list
      const progressPercentage = (completedLessons.length / totalLessons) * 100;
      await updateDoc(userCourseRef, { completedLessons, progressPercentage });
      alert("Lesson marked as incomplete!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="bg-bgPrimary py-16 min-h-screen">
      <div className="container mx-auto px-4 max-md:px-4">
        <div className="grid grid-cols-12 md:grid-cols-12 grid-rows-2 md:grid-rows-1 gap-6">
          {/* Sidebar */}
          <div className="row-span-1 col-span-4">
            <Sidebar
              courseTitle={courseTitle}
              totalLessons={totalLessons}
              loading={loading}
              onLessonClick={handleLessonClick}
              lessons={lessons}
              activeIndex={activeIndex} // Pass activeIndex
              setActiveIndex={setActiveIndex} // Pass setActiveIndex
              userCourseData={userCourseData}
            />
          </div>
          <div className="row-span-1 col-span-8">
            <Course
              lesson={selectLesson}
              lessons={lessons}
              setSelectLesson={setSelectLesson}
              onLogout={logout}
              userCourseData={userCourseData}
              completeLesson={handleMarkAsComplete}
              handleUndo={handleUndo}
              setActiveIndex={setActiveIndex} // Pass setActiveIndex
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
