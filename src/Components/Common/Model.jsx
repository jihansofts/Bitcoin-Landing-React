import React, { useState } from "react";
import {
  auth,
  signInAnonymously,
  signInWithPopup,
 linkWithCredential, EmailAuthProvider,
 signInWithCredential,
  provider,
  db,
} from "../firebase"; // Ensure Firebase is correctly initialized
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import InputField from "../Common/InputField";
import { IoCloseSharp } from "react-icons/io5";

const Model = ({ onClose, selectedCourseId }) => {
  const courseId = selectedCourseId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleGoogleSignIn = async () => {
  //   try {
  //     setLoading(true);
  //     // Sign in with Google
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     if (!user) {
  //       throw new Error("Google Sign-In Failed");
  //     }
  //     // Check if a course is selected
  //     if (!courseId) {
  //       toast.error("Course ID not found! Please select a course first.");
  //       setLoading(false);
  //       return;
  //     }

  //     // Fetch the course details to get totalLessons
  //     const courseRef = doc(db, "course", courseId);
  //     const courseSnap = await getDoc(courseRef);
  //     if (!courseSnap.exists()) {
  //       toast.error("Course not found!");
  //       setLoading(false);
  //       return;
  //     }
  //     const courseData = courseSnap.data();
  //     const totalLessons = courseData.totalLessons || 0; // Default to 0 if not set

  //     // Reference to the user's enrolled courses subcollection in Firestore
  //     const enrolledCoursesRef = doc(
  //       db,
  //       "users",
  //       user.uid,
  //       "enrolledCourses",
  //       courseId
  //     );
  //     // Check if the user is already enrolled in this course
  //     const enrolledCoursesSnap = await getDoc(enrolledCoursesRef);
  //     if (enrolledCoursesSnap.exists()) {
  //       navigate(`/dashboard/course/${courseId}`);
  //       setLoading(false);
  //       return;
  //     }

  //     // Add the user to the enrolled courses subcollection
  //     await setDoc(enrolledCoursesRef, {
  //       courseId: courseId,
  //       totalLessons: totalLessons,
  //       completedLessons: [],
  //       totalLessons: totalLessons, // Use the fetched totalLessons value
  //     });

  //     navigate(`/dashboard/course/${courseId}`);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Google Sign-In Error:", error);
  //     toast.error("Google Login Failed!");
  //   }
  // };

const handleEmailSignIn = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { name, email } = formData;
    let user = auth.currentUser;

    // 🔹 Step 1: Check if user is already signed in
    if (!user) {
      // console.log("No existing user, signing in anonymously...");
      const result = await signInAnonymously(auth);
      user = result.user;
    }
    // 🔹 Step 2: Check if the user is anonymous & upgrade if needed
    if (email && user.isAnonymous) {
      try {
        // 🔹 Check if email exists in Firestore before upgrading
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // 🔹 Email already exists, sign in instead of linking
          // console.log("User with email exists. Signing in...");
          const credential = EmailAuthProvider.credential(email, "defaultPassword");
          const signInResult = await signInWithCredential(auth, credential);
          user = signInResult.user;
        } else {
          // 🔹 No existing user, safe to upgrade anonymous account
          const credential = EmailAuthProvider.credential(email, "defaultPassword");
          await linkWithCredential(user, credential);
          // console.log("Anonymous account upgraded with email:", email);
        }
      } catch (signInError) {
        setLoading(false);
        // console.error("Error signing in or upgrading anonymous account:", signInError);
        throw signInError;
      }
    }
    setLoading(false);
    // 🔹 Step 3: Save user details in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: email || "",
        name: name || "Anonymous",
        isAnonymous: user.isAnonymous,
        createdAt: new Date(),
      });
    }
    // 🔹 Step 4: Check & Enroll in Course
    if (!courseId) {
      toast.error("Course ID not found! Please select a course first.");
      return;
    }
    setLoading(true);
    const courseRef = doc(db, "course", courseId);
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      toast.error("Course not found!");
      return;
    }
    const enrolledCoursesRef = doc(db, "users", user.uid, "enrolledCourses", courseId);
    const enrolledCoursesSnap = await getDoc(enrolledCoursesRef);
    if (enrolledCoursesSnap.exists()) {
      navigate(`/dashboard/course/${courseId}`);
      setLoading(false);
      return;
    }
    await setDoc(enrolledCoursesRef, {
      userId: user.uid,
      courseId: courseId,
      totalLessons: courseSnap.data().totalLessons || 0,
      completedLessons: [],
    });
    setTimeout(() => {
      navigate(`/dashboard/course/${courseId}`);
    },1000)
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error("Sign-In Error:", error);
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already registered. Please sign in instead.");
    } else {
      toast.error("Login Failed!");
    }
  }
};


  return (
    <div className="fixed top-0 max-sm:top-[-12px] left-[-12px] max-xl:left-[-5px] max-sm:left-[-5px] w-full h-full flex items-center justify-center z-50">
      <div className="relative bg-bgPrimary w-[80%] max-w-2xl md:max-w-4xl rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-gray-700">
          <IoCloseSharp size={24} />
        </button>
        {/* Left Column (Form) */}
        <div className="w-full flex flex-col justify-center px-2 md:px-6">
          <h1 className="text-[40px] text-left max-sm:text-[24px] font-bold text-white">
           Enroll To Course
          </h1>
          <p className="text-white text-left mt-2 text-[20px] font-bold max-sm:text-[16px]">
            Welcome! Fill up the form below and sign up to enroll in your
            desired{" "}
            <span className="text-buttonColor">bitcoin learning course</span>
          </p>

          {/* Google Sign Up Button */}
          {/* <button
            onClick={handleGoogleSignIn}
            className="bg-white border cursor-pointer w-full text-[14px] max-sm:text-[12px] flex items-center justify-center gap-x-2 text-[#002E337D] py-2 px-3 rounded-lg font-semibold hover:bg-gray-100 transition-all mt-10 max-sm:mt-5">
            Continue with{" "}
            <img
              className="w-28 max-md:w-20 max-sm:w-14"
              src={Google}
              alt="Google"
            />
          </button> */}

          {/* Signup Form */}
          <form
            className="space-y-3 mt-4 max-sm:mt-0 max-sm:space-none text-left"
            onSubmit={handleEmailSignIn}>
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your Name"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
           
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 cursor-pointer  max-sm:mt-1 bg-buttonColor w-full text-bgPrimary max-md:text-[16px] py-2 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
              {loading ? "Loading..." : "Get Started"}
            </button>
          </form>
        </div>
        {/* Right Column (Image) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            className="w-full max-w-xs lg:max-w-sm"
            src={Bitcoin}
            alt="Bitcoin"
          />
        </div>
      </div>
    </div>
  );
};

export default Model;
