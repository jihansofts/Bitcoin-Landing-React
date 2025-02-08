import React, { useState } from "react";
import { auth, db, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import InputField from "../Common/InputField"; // Import reusable input component
import { IoCloseSharp } from "react-icons/io5";

const Model = ({ onClose }) => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Login Successful!");
      onClose(false);
      navigator("/");
    } catch (error) {
      toast.error("Login Failed!", error.message);
    }
  };
  return (
    <div className="fixed top-0 max-sm:top-[-12px]  left-0 max-sm:left-[-5px] w-full h-full flex items-center justify-center z-50 ">
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
          <form className="space-y-3 max-sm:space-none">
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
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 max-sm:mt-1 bg-buttonColor w-full text-bgPrimary  max-md:text-[16px] py-2 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
              Login
            </button>
            {/* don't have an account */}
            <p className="mt-3 max-sm:mt-1 text-white text-xs text-center ">
              Don’t Have an Account?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
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
