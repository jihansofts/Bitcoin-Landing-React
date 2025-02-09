import React, { useState } from "react";
import {
  auth,
  db,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import InputField from "../Common/InputField";
const Login = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) throw new Error("Google Sign-In Failed");
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const courseId = userData.courseId || null;
        navigator(courseId ? `/dashboard/course/${courseId}` : "/");
        toast.success("Login Successful!");
      }
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          enrolledCourses: [],
        });
        navigator("/");
        toast.success("Login Successful!");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Login Failed!");
    }
  };
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User not found! Please register first.");
        navigator("/signup");
        return;
      }
      const userData = userSnap.data();
      const courseId = userData.courseId || null;
      toast.success("Login Successful!");
      navigator(courseId ? `/dashboard/course/${courseId}` : "/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("User Login Not Found!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-bgPrimary py-20">
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column (Content) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 max-sm:col-span-12 max-lg:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-Inter text-white font-bold leading-tight">
                Login To Account
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-Inter font-normal text-[#D0D0D0] mt-5 lg:mt-8 leading-relaxed">
                Welcome! Fill up the form below and sign in to enroll to your
                desired{" "}
                <span className="text-buttonColor">
                  bitcoin learning course
                </span>
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="bg-white cursor-pointer w-full text-sm flex items-center justify-center gap-x-4 text-[#002E337D] py-3 px-6 rounded-sm font-semibold hover:bg-opacity-90 transition-all mt-8">
                Continue with
                <img className="w-30 max-sm:w-20" src={Google} alt="Google" />
              </button>
              <div className="w-full flex justify-between items-center mt-8">
                <div className="w-[250px] max-xl:w-[150px] max-md:w-50 max-lg:w-60 max-sm:w-30 h-[1px] bg-[#E1E1E1]"></div>
                <p className="text-[#ABB3BB] text-[12px] max-sm:text-[10px] font-serif">
                  Or Continue with Email
                </p>
                <div className="w-[250px] max-xl:w-[150px] max-md:w-50 max-lg:w-60 max-sm:w-30 h-[1px] bg-[#E1E1E1]"></div>
              </div>
            </div>
            {/* Login Form */}
            <div className="mt-8">
              <form onSubmit={HandleLogin} className="mt-8">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {/* Accept Terms Checkbox */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      className="w-4 h-4 accent-buttonColor border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-buttonColor">
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <Link
                      to="/forgot-password"
                      className="ml-2 text-sm text-buttonColor hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-6 bg-buttonColor w-[50%] text-bgPrimary text-[18px] max-md:text-[16px] py-3 px-7 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
                    Login
                  </button>
                  {/* Already have an account? */}
                  <p className="mt-4 text-[#FFFFFF] text-[15px]">
                    Don’t Have an Account?
                    <Link
                      to="/signup"
                      className="text-buttonColor ml-1 font-semibold hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 max-sm:col-span-12 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[500px] sm:max-w-full lg:max-w-[600px]"
              src={Bitcoin}
              alt="Bitcoin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
