import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Course from "./Content";
import { db, auth } from "../../Components/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
const Dashboard = () => {
  const { logout, enrolledCourses } = useAuth();
  const courseId = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
  const [selectLesson, setSelectLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active lesson index
  // Fetch all lessons for a given course
  useEffect(() => {
    if (!courseId) return; // Skip if no courseId available
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const lessonsRef = collection(db, "course", courseId, "lessons");
        const querySnapshot = await getDocs(lessonsRef);
        const lessonsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonClick = (lesson, index) => {
    setSelectLesson(lesson); // Update the selected lesson
    setActiveIndex(index); // Update the active index
  };

  const completeLesson = async (lessonId) => {
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

      if (!userCourseSnap.exists()) {
        return alert("You need to enroll in this course first!");
      }
      let { completedLessons = [], totalLessons = 0 } = userCourseSnap.data();
      if (completedLessons.includes(lessonId)) {
        return alert("Lesson already completed!");
      }
      completedLessons.push(lessonId);
      const progressPercentage = (completedLessons.length / totalLessons) * 100;

      await updateDoc(userCourseRef, {
        completedLessons,
        progressPercentage,
      });

      alert("Lesson completed!");
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
              loading={loading}
              onLessonClick={handleLessonClick}
              lessons={lessons}
              activeIndex={activeIndex} // Pass activeIndex
              setActiveIndex={setActiveIndex} // Pass setActiveIndex
            />
          </div>
          {/* Content */}
          <div className="row-span-1 col-span-8">
            <Course
              lesson={selectLesson}
              lessons={lessons}
              setSelectLesson={setSelectLesson}
              onLogout={logout}
              completeLesson={completeLesson}
              activeIndex={activeIndex} // Pass activeIndex
              setActiveIndex={setActiveIndex} // Pass setActiveIndex
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
