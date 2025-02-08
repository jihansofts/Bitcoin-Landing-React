import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth, onAuthStateChanged, signOut } from "../Components/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { setToken, removeToken } from "../Helper/localStorage";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courseId, setCourseId] = useState(null); // Store selected course ID
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Store enrolled courses
  const [courseTitle, setCourseTitle] = useState(""); // Store course title
  const [totalLessons, setTotalLessons] = useState(0); // Store total lessons count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken.setToken(token);
        fetchEnrolledCoursesRealtime(user.uid);
        // Fetch user's enrolled courses
        const userCoursesRef = collection(
          db,
          "users",
          user.uid,
          "enrolledCourses"
        );
        const snapshot = await getDocs(userCoursesRef);
        if (!snapshot.empty) {
          const courses = snapshot.docs.map((doc) => doc.id);
          setEnrolledCourses(courses);
          setCourseId(courses[0] || null); // Set the first enrolled course
        }
      } else {
        removeToken.removeToken();
        setEnrolledCourses([]);
        setCourseId(null);
        setCourseTitle("");
        setTotalLessons(0);
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // ✅ Real-time listener for enrolled courses
  const fetchEnrolledCoursesRealtime = (userId) => {
    const userCoursesRef = collection(db, "users", userId, "enrolledCourses");
    const unsubscribe = onSnapshot(userCoursesRef, async (snapshot) => {
      if (!snapshot.empty) {
        const courses = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const courseId = docSnap.id;
            const courseRef = doc(db, "course", courseId);
            const courseDoc = await getDoc(courseRef);
            if (courseDoc.exists()) {
              return { id: courseId, ...courseDoc.data() };
            } else {
              return { id: courseId, title: "Unknown Course", totalLessons: 0 };
            }
          })
        );
        setEnrolledCourses(courses);
        setCourseId(courses.length > 0 ? courses[0].id : null); // Set first course
      } else {
        setEnrolledCourses([]);
        setCourseId(null);
      }
    });
    return unsubscribe;
  };

  // Fetch Course Title and Total Lessons when courseId is available
  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async () => {
      try {
        const courseDocRef = doc(db, "course", courseId);
        const courseDoc = await getDoc(courseDocRef);
        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourseTitle(courseData.title || "Untitled Course");
          setTotalLessons(courseData.totalLessons || 0);
        } else {
          console.error("Course not found!");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    setEnrolledCourses([]);
    setCourseId(null);
    setCourseTitle("");
    setTotalLessons(0);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        courseId,
        enrolledCourses,
        courseTitle,

        totalLessons,
        logout,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
