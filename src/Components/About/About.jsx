import React from "react";
import Shaperigjt from "../../assets/img/shaperight.png";
import AboutImg from "../../assets/img/About.png";
const About = () => {
  return (
    <div className="w-full relative bg-bgPrimary py-20">
      <div className="container mx-auto px-4 text-start">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
            <div className="">
              <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
                About Us
              </h4>
              <h2 className="relative text-[60px] max-lg:text-[50px] max-md:text-[40px] font-Inter text-white font-bold">
                How We Can{" "}
                <span className="relative inline-block group">
                  <span className="relative z-10">Help</span>
                  <span className="absolute left-0 bottom-5 w-full h-[35px] bg-bgSecondary opacity-50 z-0"></span>
                </span>
              </h2>
              <p className="text-[16px] lg:text-[18px] font-Inter font-light text-white mt-5 lg:mt-8 leading-10">
                Whether you're a beginner looking to understand the basics or an
                enthusiast eager to explore advanced concepts, we provide clear,
                reliable, and up-to-date information to help you make informed
                decisions. At Fiveminutebitcoin, we believe Bitcoin is the
                future of finance, and we’re here to guide you every step of the
                way. Join us and start your journey toward financial freedom
                today!
              </p>
              <div className="mt-8 lg:mt-10">
                <button className="bg-buttonColor text-bgPrimary py-3 px-7 rounded-3xl font-Inter font-semibold hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[400px] lg:max-w-full"
              src={AboutImg}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="absolute w-100 h-100 bottom-0 right-0">
        <img className="w-full" src={Shaperigjt} alt="" />
      </div>
    </div>
  );
};
export default About;
