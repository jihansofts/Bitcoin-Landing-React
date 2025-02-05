import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import InputField from "../Common/InputField"; // Import reusable input component
const Signup = () => {
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
    <div className="w-full bg-bgPrimary py-20">
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column (Form) */}
          <div className="col-span-12 lg:col-span-6">
            <h1 className="text-3xl lg:text-5xl font-Inter text-white font-bold">
              Create Account
            </h1>
            <p className="text-lg text-[#D0D0D0] mt-5">
              Welcome! Fill up the form below to sign up.
            </p>

            {/* Google Sign Up Button */}
            <button className="bg-white w-full text-sm flex items-center justify-center gap-x-4 text-[#002E337D] py-3 px-6 rounded-sm font-semibold hover:bg-opacity-90 transition-all mt-8">
              Continue with <img className="w-30" src={Google} alt="Google" />
            </button>

            {/* Divider */}
            <div className="w-full flex items-center mt-8">
              <div className="flex-1 h-[1px] bg-[#E1E1E1]"></div>
              <p className="text-[#ABB3BB] text-xs px-2">
                Or Continue with Email
              </p>
              <div className="flex-1 h-[1px] bg-[#E1E1E1]"></div>
            </div>

            {/* Signup Form */}
            <form className="mt-8">
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
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className="w-4 h-4 accent-buttonColor border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-buttonColor">
                  Accept Terms of Service
                </label>
              </div>
              <div className="mt-4 flex flex-col items-center">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 bg-buttonColor w-[50%] text-white py-3 px-7 rounded-sm font-semibold hover:bg-opacity-90 transition-all">
                  Sign Up
                </button>

                {/* Already have an account? */}
                <p className="mt-4 text-[#D0D0D0] text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-buttonColor font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[500px] lg:max-w-[600px]"
              src={Bitcoin}
              alt="Bitcoin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
