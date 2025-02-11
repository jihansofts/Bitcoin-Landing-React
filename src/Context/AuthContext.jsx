import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth, onAuthStateChanged, signOut } from "../Components/firebase";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { setToken, removeToken } from "../Helper/localStorage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [enrollData, setEnrollData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [totalLessons, setTotalLessons] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Move fetchEnroll outside of useEffect
  const fetchEnroll = async () => {
    setLoading(true); // Start loading
    try {
      const querySnapshot = await getDocs(collection(db, "course"));
      if (querySnapshot.empty) {
        console.log("No documents found");
      }
      const courseData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnrollData(courseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken.setToken(token);
        fetchEnrolledCoursesRealtime(user.uid); // 🔥 Listen for real-time updates
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

  // ✅ Call fetchEnroll inside useEffect
  useEffect(() => {
    fetchEnroll();
  }, []);

  // ✅ Fetch enrolled courses in real-time
  const fetchEnrolledCoursesRealtime = (userId) => {
    const userCoursesRef = collection(db, "users", userId, "enrolledCourses");
    return onSnapshot(userCoursesRef, async (snapshot) => {
      if (!snapshot.empty) {
        const courses = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const courseId = docSnap.id;
            const courseRef = doc(db, "course", courseId);
            const courseDoc = await getDoc(courseRef);
            return courseDoc.exists()
              ? { id: courseId, ...courseDoc.data() }
              : { id: courseId, title: "Unknown Course", totalLessons: 0 };
          })
        );
        setEnrolledCourses(courses);
      } else {
        setEnrolledCourses([]);
        setCourseId(null);
      }
    });
  };

  useEffect(() => {
    if (!courseId) return;
    const fetchCourseDetails = async () => {
      try {
        const courseDocRef = doc(db, "course", courseId);
        const courseDoc = await getDoc(courseDocRef);
        if (courseDoc.exists()) {
          setCourseTitle(courseDoc.data().title || "Untitled Course");
          setTotalLessons(courseDoc.data().totalLessons || 0);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const logout = async () => {
    await signOut(auth);
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
        enrollData,
        fetchEnroll, // ✅ Now fetchEnroll is defined and accessible
        setCourseId,
        setEnrolledCourses,
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
