import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bitcoin from "../../assets/img/Bitcoin.png";
import Google from "../../assets/img/google.png";
import { Eye, EyeOff } from "react-feather";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [acceptTerms, setAcceptTerms] = useState(false); // State for terms checkbox
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTermsCheckbox = () => {
    setAcceptTerms(!acceptTerms);
  };
  return (
    <div className="w-full bg-bgPrimary py-20">
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column (Content) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 max-lg:text-center">
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
              <button className="bg-white w-full text-sm sm:text-base cursor-pointer flex items-center justify-center gap-x-4 text-[#002E337D] py-3 px-6 rounded-sm font-Inter font-semibold hover:bg-opacity-90 transition-all mt-8">
                Continue with{" "}
                <img className="block w-30" src={Google} alt="Google" />
              </button>
              <div className="w-full flex justify-between items-center mt-8">
                <div className="w-[250px] max-xl:w-[150px] max-md:w-50 max-lg:w-60 max-sm:w-30 h-[1px] bg-[#E1E1E1]"></div>
                <p className="text-[#ABB3BB] text-[12px] max-sm:text-[10px] font-serif">
                  Or Continue with Email
                </p>
                <div className="w-[250px] max-xl:w-[150px] max-md:w-50 max-lg:w-60 max-sm:w-30 h-[1px] bg-[#E1E1E1]"></div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="mt-8">
              <form action="">
                {/* Email Input */}
                <div className="mb-6">
                  <label
                    className="text-white text-[16px] font-Inter font-semibold"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#002E337D] border border-[#E1E1E1] text-white py-3 px-5 rounded-sm font-Inter font-normal  mt-2 placeholder:text-[#D0D0D0] focus:outline-none focus:border-buttonColor"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label
                    className="text-white text-[16px] font-Inter font-semibold"
                    htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className="w-full bg-[#002E337D] border border-[#E1E1E1] text-white py-3 px-5 rounded-sm font-Inter font-normal  mt-2 placeholder:text-[#D0D0D0] focus:outline-none focus:border-buttonColor"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-2">
                      {showPassword ? (
                        <EyeOff className="text-[#D0D0D0]" size={20} />
                      ) : (
                        <Eye className="text-[#D0D0D0]" size={20} />
                      )}
                    </button>
                  </div>
                </div>
                {/* Accept Terms Checkbox */}
                <div className="flex justify-between items-center">
                  <div className="mt-2  flex items-center  rounded-lg">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={handleTermsCheckbox}
                      className="w-4 h-4 accent-buttonColor  border-gray-300 rounded focus:ring-buttonColor focus:ring-2"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm font-Inter text-buttonColor">
                      Accept Terms of Service
                    </label>
                  </div>
                  <a
                    className="text-[14px] font-Inter text-buttonColor"
                    href="#">
                    Forgot Password
                  </a>
                </div>

                <div className="flex flex-col justify-center items-center">
                  {/* Submit Button */}
                  <div className="mt-2 lg:mt-10 w-[300px]">
                    <button
                      type="submit"
                      className="bg-buttonColor w-full text-bgPrimary py-3 px-7 rounded-sm font-Inter font-semibold hover:bg-opacity-90 transition-all">
                      Login
                    </button>
                  </div>
                  {/* Already have an account? Login */}
                  <div className="mt-6 text-center">
                    <p className="text-[#D0D0D0] text-sm font-Inter">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="text-buttonColor font-semibold hover:underline">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
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
