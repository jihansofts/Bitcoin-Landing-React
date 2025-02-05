import React from "react";
import Shaperight from "../../assets/img/shaperight.png";
import AboutImg from "../../assets/img/About.png";

const About = () => {
  return (
    <div className="w-full relative bg-bgPrimary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Column (Text) */}
          <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
            <div className="w-full max-w-lg mx-auto lg:max-w-none">
              <h4 className="text-[24px] max-md:text-[20px] font-Inter text-buttonColor font-bold">
                About Us
              </h4>
              <h2 className="relative text-[50px] max-lg:text-[40px] max-md:text-[32px] font-Inter text-white font-bold">
                How We Can{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Help</span>
                  <span className="absolute left-0 bottom-1 w-full h-[30px] bg-bgSecondary opacity-50 z-0"></span>
                </span>
              </h2>
              <p className="text-[16px] max-md:text-[14px] font-Inter font-light text-white mt-5 leading-7">
                Whether you're a beginner looking to understand the basics or an
                enthusiast eager to explore advanced concepts, we provide clear,
                reliable, and up-to-date information to help you make informed
                decisions. At Fiveminutebitcoin, we believe Bitcoin is the
                future of finance, and we’re here to guide you every step of the
                way.
              </p>
              <div className="mt-6">
                <button className="bg-buttonColor text-bgPrimary py-3 px-7 rounded-3xl font-Inter font-semibold hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-xs sm:max-w-md lg:max-w-full"
              src={AboutImg}
              alt="About"
            />
          </div>
        </div>
      </div>

      {/* Background Shape */}
      <div className="absolute hidden sm:block w-[150px] lg:w-[200px] bottom-[100px] right-0">
        <img className="w-full" src={Shaperight} alt="Shape Right" />
      </div>
    </div>
  );
};

export default About;
