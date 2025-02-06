import React from "react";
import Shape from "../../assets/img/shape.png";
import Shaperight from "../../assets/img/shaperight.png";
import Bitcoin from "../../assets/img/Bitcoin.png";

const Home = () => {
  return (
    <div className="relative w-full bg-bgPrimary py-8 sm:py-16 overflow-hidden">
      {/* Background Left Shape */}
      <div className="absolute hidden sm:block w-[120px] md:w-[200px] lg:w-[250px] top-0 left-0">
        <img className="w-full" src={Shape} alt="Left Shape" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-4">
        <div className="grid grid-cols-12 gap-4 sm:gap-8 items-center">
          {/* Left Column (Text) */}
          <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
            <div className="w-full max-w-lg mx-auto">
              <h1 className="text-[24px] sm:text-[32px] md:text-[50px] lg:text-[60px] xl:text-[72px] font-Inter text-white font-bold leading-tight">
                Unlock the Power of <br className="hidden lg:block" />
                <span className="text-buttonColor">Bitcoin</span> – Learn,
                Invest, Succeed!
              </h1>
              <p className="text-[14px] sm:text-[16px] text-white mt-4 sm:mt-5 leading-relaxed">
                Welcome to 5 Minute Bitcoin! Your crash course in Bitcoin:
                simple, clear, and free of sales pitches. We aim to tell you
                everything you need to know about Bitcoin without
                overcomplicating it. No fluff, no jargon—just the essential
                facts.
              </p>
              <div className="mt-4 sm:mt-6">
                <button className="bg-buttonColor text-bgPrimary py-2 sm:py-3 px-4 sm:px-6 rounded-3xl font-semibold hover:bg-opacity-90 transition-all text-sm sm:text-base">
                  Ready To Dive In?
                </button>
              </div>
            </div>
          </div>
          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-6 sm:mt-0">
            <img
              className="w-full max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-full"
              src={Bitcoin}
              alt="Bitcoin"
            />
          </div>
        </div>
      </div>

      {/* Background Right Shape */}
      <div className="absolute hidden sm:block w-[120px] md:w-[200px] lg:w-[250px] bottom-0 right-0">
        <img className="w-full" src={Shaperight} alt="Right Shape" />
      </div>
    </div>
  );
};

export default Home;
