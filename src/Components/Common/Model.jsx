import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import InputField from "../Common/InputField"; // Import reusable input component
import { IoCloseSharp } from "react-icons/io5";

const Model = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-bgPrimary w-[90%] h-auto max-sm:py-5 max-w-2xl md:max-w-4xl rounded-lg shadow-lg p-6 md:p-10 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute cursor-pointer top-4 right-4 text-red-500 hover:text-gray-700">
          <IoCloseSharp size={30} />
        </button>

        {/* Left Column (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-white mt-2 text-sm max-sm:text-[12px]">
            Welcome! Fill up the form below and sign up to enroll in your
            desired{" "}
            <span className="text-buttonColor">bitcoin learning course</span>
          </p>

          {/* Google Sign Up Button */}
          <button className="bg-white border cursor-pointer w-full text-sm flex items-center justify-center gap-x-2 text-bgPrimary py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all mt-4">
            Continue with{" "}
            <img className="w-30 max-sm:w-20" src={Google} alt="Google" />
          </button>

          {/* Divider */}
          <div className="w-full flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="text-gray-500 text-xs px-2">Or Continue with Email</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="@username"
              value={formData.name}
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
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-type your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {/* Accept Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="w-4 h-4 accent-buttonColor border-gray-300 rounded"
              />
              <label className="text-sm text-buttonColor">
                Accept Terms of Service
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-buttonColor w-full md:w-3/4 text-white py-3 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
              Sign Up
            </button>

            {/* Already have an account? */}
            <p className="mt-4 text-white text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline">
                Login
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
