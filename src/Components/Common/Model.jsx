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
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) {
        throw new Error("Google Sign-In Failed");
      }
      // Check if a course is selected
      if (!courseId) {
        toast.error("Course ID not found! Please select a course first.");
        return;
      }

      // Fetch the course details to get totalLessons
      const courseRef = doc(db, "course", courseId);
      const courseSnap = await getDoc(courseRef);
      if (!courseSnap.exists()) {
        toast.error("Course not found!");
        return;
      }
      const courseData = courseSnap.data();
      const totalLessons = courseData.totalLessons || 0; // Default to 0 if not set

      // Reference to the user's enrolled courses subcollection in Firestore
      const enrolledCoursesRef = doc(
        db,
        "users",
        user.uid,
        "enrolledCourses",
        courseId
      );

      // Check if the user is already enrolled in this course
      const enrolledCoursesSnap = await getDoc(enrolledCoursesRef);
      if (enrolledCoursesSnap.exists()) {
        toast.info("You are already enrolled in this course.");
        navigate(`/dashboard/course/${courseId}`);
        return;
      }

      // Add the user to the enrolled courses subcollection
      await setDoc(enrolledCoursesRef, {
        courseId: courseId,
        totalLessons: totalLessons,
        completedLessons: [],
        totalLessons: totalLessons, // Use the fetched totalLessons value
      });

      toast.success("Enrollment successful!"); // Wait 2 seconds before navigating
      navigate(`/dashboard/course/${courseId}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Login Failed!");
    }
  };
const handleEmailSignIn = async (e) => {
  e.preventDefault();
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
          console.log("User with email exists. Signing in...");
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
        // console.error("Error signing in or upgrading anonymous account:", signInError);
        throw signInError;
      }
    }

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

    const courseRef = doc(db, "course", courseId);
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      toast.error("Course not found!");
      return;
    }

    const enrolledCoursesRef = doc(db, "users", user.uid, "enrolledCourses", courseId);
    const enrolledCoursesSnap = await getDoc(enrolledCoursesRef);

    if (enrolledCoursesSnap.exists()) {
      toast.info("You are already enrolled in this course.");
      navigate(`/dashboard/course/${courseId}`);
      return;
    }

    await setDoc(enrolledCoursesRef, {
      userId: user.uid,
      courseId: courseId,
      totalLessons: courseSnap.data().totalLessons || 0,
      completedLessons: [],
    });

    toast.success("Enrollment successful!");
    navigate(`/dashboard/course/${courseId}`);
  } catch (error) {
    console.error("Sign-In Error:", error);
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already registered. Please sign in instead.");
    } else {
      toast.error("Login Failed!");
    }
  }
};



// const handleEmailSignIn = async (e) => {
//   e.preventDefault();
//   try {
//     const { name, email } = formData;
//     let user = auth.currentUser;

//     // 🔹 Step 1: Check if user is already signed in
//     if (!user) {
//       const result = await signInAnonymously(auth);
//       user = result.user;
//     }
//     // 🔹 Step 2: Upgrade Anonymous User to Email/Password User
//     if (email && user.isAnonymous) {
//       const credential = EmailAuthProvider.credential(email,name); // Set a default password
//       await linkWithCredential(user, credential);
//       console.log("Anonymous account upgraded with email:", email);
//     }

//     // 🔹 Step 3: Save user details in Firestore
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);
//     if (!userSnap.exists()) {
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: email || "",
//         isAnonymous: false,
//       });
//     }
   
//     // 🔹 Step 4: Check & Enroll in Course
//     if (!courseId) {
//       toast.error("Course ID not found! Please select a course first.");
//       return;
//     }

//     const courseRef = doc(db, "course", courseId);
//     const courseSnap = await getDoc(courseRef);
//     if (!courseSnap.exists()) {
//       toast.error("Course not found!");
//       return;
//     }
//     const courseData = courseSnap.data();
//     const totalLessons = courseData.totalLessons || 0;
    
//     const enrolledCoursesRef = doc(db, "users", user.uid, "enrolledCourses", courseId);
//     const enrolledCoursesSnap = await getDoc(enrolledCoursesRef);

//     if (enrolledCoursesSnap.exists()) {
//       toast.info("You are already enrolled in this course.");
//       navigate(`/dashboard/course/${courseId}`);
//       return;
//     }
//     await setDoc(enrolledCoursesRef, {
//       userId: user.uid,
//       courseId: courseId,
//       totalLessons: totalLessons,
//       completedLessons: [],
//     });

//     toast.success("Enrollment successful!");
//     navigate(`/dashboard/course/${courseId}`);
//   } catch (error) {
//     console.error("Sign-In Error:", error);
//     toast.error("Login Failed!");
//   }
// };


  // const handleEmailSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const {name ,email } = formData;
  //     const result = await signInAnonymously(auth,name ,email);
  //     const user = result.user;
  //     if (!user) {
  //       navigate("/");
  //     }
  //     if(!courseId){
  //       toast.error("Course ID not found! Please select a course first.");
  //       return;
  //     }

  //     const courseRef = doc(db, "course", courseId);
  //     const courseSnap = await getDoc(courseRef);
  //     if (!courseSnap.exists()) {
  //       toast.error("Course not found!");
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
  //       toast.info("You are already enrolled in this course.");
  //      navigate(`/dashboard/course/${courseId}`);
  //       return;
  //     }
  //     // Add the user to the enrolled courses subcollection
  //     await setDoc(enrolledCoursesRef, {
  //       isAnonymous: true,
  //       userId: user.uid,
  //       courseId: courseId,
  //       totalLessons: totalLessons,
  //       completedLessons: [],
  //       totalLessons: totalLessons, // Use the fetched totalLessons value
  //     });

  //     toast.success("Enrollment successful!"); // Wait 2 seconds before navigating
  //     navigate(`/dashboard/course/${courseId}`);
  //     console.log(courseId, "courseId end");
  //   } catch (error) {
  //     console.error("Email Sign-In Error:", error);
  //     toast.error("Login Failed! Please check your credentials.");
  //   }
  // };
  return (
    <div className="fixed top-0 max-sm:top-[-12px] left-0 max-sm:left-[-5px] w-full h-full flex items-center justify-center z-50">
      <div className="relative bg-bgPrimary w-[90%] max-w-2xl md:max-w-4xl rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-gray-700">
          <IoCloseSharp size={24} />
        </button>
        {/* Left Column (Form) */}
        <div className="w-full flex flex-col justify-center px-2 md:px-6">
          <h1 className="text-2xl max-sm:text-xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-white mt-1 text-xs max-sm:text-[10px]">
            Welcome! Fill up the form below and sign up to enroll in your
            desired{" "}
            <span className="text-buttonColor">bitcoin learning course</span>
          </p>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignIn}
            className="bg-white border cursor-pointer w-full text-[14px] max-sm:text-[12px] flex items-center justify-center gap-x-2 text-[#002E337D] py-2 px-3 rounded-lg font-semibold hover:bg-gray-100 transition-all mt-3">
            Continue with{" "}
            <img
              className="w-28 max-md:w-20 max-sm:w-14"
              src={Google}
              alt="Google"
            />
          </button>

          {/* Divider */}
          <div className="w-full flex items-center my-3 max-sm:my-1">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="text-gray-500 text-[10px] px-2">
              Or Continue with Email
            </p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {/* Signup Form */}
          <form
            className="space-y-3 max-sm:space-none text-left"
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
              className="mt-3 max-sm:mt-1 bg-buttonColor w-full text-bgPrimary max-md:text-[16px] py-2 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
              Get Started
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
