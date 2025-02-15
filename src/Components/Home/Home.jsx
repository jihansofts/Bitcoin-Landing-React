import React from "react";
import Shape from "../../assets/img/shape.png";
import Shaperight from "../../assets/img/shaperight.png";
import Bitcoin from "../../assets/img/Bitcoin.png";

const Home = () => {
  const scrollToCourse = () => {
    const courseSection = document.getElementById("course");
    if (courseSection) {
      courseSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative w-full bg-bgPrimary py-16 overflow-hidden">
      {/* Background Left Shape */}
      <div className="absolute z-0 w-[400px] max-md:w-[200px] max-lg:w-[300px] top-0 left-0">
        <img className="w-full" src={Shape} alt="Left Shape" />
      </div>
      {/* Content */}
      <div className="container relative z-40 mx-auto px-4 max-md:px-4">
        <div className="grid grid-cols-12 max-md:grid-cols-1 gap-8 max-md:gap-6 items-center">
          {/* Left Column (Text) */}
          <div className="col-span-12 lg:col-span-7 max-md:col-span-1 text-center lg:text-left">
            <div className="w-full mx-auto max-md:w-full">
              <h1 className="text-[72px] max-sm:text-[42px] max-md:text-[40px] max-lg:text-[50px] max-xl:text-[60px]  font-Inter text-white font-bold leading-tight">
                Unlock the Power of <br className="hidden lg:block" />
                <span className="text-buttonColor">Bitcoin</span> – Learn,
                Invest, Succeed!
              </h1>
              <p className="text-[20px] max-md:text-[18px] font-inter font-semibold text-white mt-5 leading-relaxed">
                Welcome to 5 Minute Bitcoin! Your crash course in Bitcoin:
                simple, clear, and free of sales pitches. We aim to tell you
                everything you need to know about Bitcoin without
                overcomplicating it. No fluff, no jargon—just the essential
                facts.
              </p>
              <div className="mt-6 z-10">
                <button
                  onClick={scrollToCourse}
                  className="bg-buttonColor cursor-pointer text-bgPrimary py-3 px-6 sm:px-8 rounded-3xl font-semibold hover:bg-opacity-90 transition-all">
                  Ready To Dive In?
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-5 max-md:col-span-1 flex justify-center lg:justify-end">
            <img className="w-full " src={Bitcoin} alt="Bitcoin" />
          </div>
        </div>
      </div>
      {/* Background Right Shape */}
      <div className="absolute  w-[400px] bottom-0 right-0">
        <img className="w-full" src={Shaperight} alt="Right Shape" />
      </div>
    </div>
  );
};

export default Home;
