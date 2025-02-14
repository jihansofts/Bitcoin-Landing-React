import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth, onAuthStateChanged, signOut } from "../Components/firebase";
import {
  doc,
  getDoc,
  collection, 
  onSnapshot,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import {
  setToken,
  removeToken,
  removeCourseId,
  setCourseIds,
} from "../Helper/localStorage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [enrollData, setEnrollData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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
      setCourseIds.setCourseId(courseData?.[0].id);
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
        console.log("Enrolled Courses:", courses);
        setEnrolledCourses(courses);
      } else {
        console.log("No enrolled courses found");
      }
    });
  };
  const getTotalUsers = async () => {
    const usersCollection = collection(db, "users"); // Reference to the "users" collection
    try {
      const snapshot = await getCountFromServer(usersCollection); // Get the count of documents
      const totalUsers = snapshot.data().count; // Extract the count from the snapshot
      return totalUsers; // Return the total number of users
    } catch (error) {
      console.error("Error getting total users:", error);
      return 0; // Return 0 in case of an error
    }
  };

  const logout = async () => {
    await signOut(auth);
    removeToken.removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        courseId,
        enrollData,
        getTotalUsers,
        fetchEnroll, // ✅ Now fetchEnroll is defined and accessible
        setCourseId,
        setEnrolledCourses,
        enrolledCourses,
        logout,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
