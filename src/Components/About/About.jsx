import React from "react";
import Shaperight from "../../assets/img/shaperight.png";
import AboutImg from "../../assets/img/About.png";

const About = () => {
  return (
    <div className="relative w-full bg-bgPrimary py-16 overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-4 max-md:px-4">
        <div className="grid grid-cols-12 max-md:grid-cols-1 gap-8 max-md:gap-6 items-center">
          {/* Left Column (Text) */}
          <div className="col-span-10 lg:col-span-7 max-md:col-span-1 text-center lg:text-left">
            <div className="w-full mx-auto max-md:w-full">
              <h3 className="text-[24px] font-Inter text-buttonColor font-bold">
                About Us
              </h3>
              <h2 className="relative text-[60px] max-lg:text-[50px] max-md:text-[40px] max-sm:text-[32px] font-Inter text-white font-bold">
                How We Can{" "}
                <span className="relative inline-block group">
                  <span className="relative z-10">Help</span>
                  <span className="absolute left-0 bottom-5 max-sm:bottom-0 max-md:bottom-1 max-lg:bottom-2 w-full h-[35px] bg-bgSecondary opacity-50 z-0"></span>
                </span>
              </h2>

              <p className="text-[14px] sm:text-[16px] text-white mt-4 sm:mt-5 leading-relaxed">
                Whether you're a beginner looking to understand the basics or an
                enthusiast eager to explore advanced concepts, we provide clear,
                reliable, and up-to-date information to help you make informed
                decisions. At Fiveminutebitcoin, we believe Bitcoin is the
                future of finance, and we’re here to guide you every step of the
                way. Join us and start your journey toward financial freedom
                today!
              </p>
              <div className="mt-6">
                <button className="bg-buttonColor text-bgPrimary py-3 px-6 sm:px-8 rounded-3xl font-semibold hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="col-span-10 lg:col-span-5 max-md:col-span-1 flex justify-center lg:justify-end">
            <img className="w-full " src={AboutImg} alt="Bitcoin" />
          </div>
        </div>
      </div>
      {/* Background Right Shape */}
      <div className="absolute w-[400px] bottom-0 right-0">
        <img className="w-full" src={Shaperight} alt="Right Shape" />
      </div>
    </div>
  );
};

export default About;


