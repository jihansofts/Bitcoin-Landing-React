import React from "react";
import Shape from "../../assets/img/shape.png";
import Shaperigjt from "../../assets/img/shaperight.png";
import Bitcoin from "../../assets/img/Bitcoin.png";

const Home = () => {
  return (
    <div className="w-full relative bg-bgPrimary py-10 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute w-100 h-100 top-[-50px] left-0">
        <img className="w-full" src={Shape} alt="" />
      </div>
      {/* Content */}
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column (Content) */}
          <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
            <h1 className="text-[32px] lg:text-[72px] font-Inter text-white font-bold leading-tight">
              Unlock the Power of <br className="hidden lg:block" />
              <span className="text-buttonColor">Bitcoin</span> – Learn, Invest,
              Succeed!
            </h1>
            <p className="text-[16px] lg:text-[18px] font-Inter font-light text-white mt-5 lg:mt-8 leading-10">
              Welcome to 5 Minute Bitcoin! Your crash course in Bitcoin: simple,
              clear, and free of sales pitches. We aim to tell you everything
              you need to know about Bitcoin without overcomplicating it. No
              fluff, no jargon—just the essential facts.
            </p>
            <div className="mt-8 lg:mt-10">
              <button className="bg-buttonColor text-bgPrimary py-3 px-7 rounded-3xl font-Inter font-semibold hover:bg-opacity-90 transition-all">
                Ready To Dive In?
              </button>
            </div>
          </div>
          {/* Right Column (Image) */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[400px] lg:max-w-full"
              src={Bitcoin}
              alt="Bitcoin"
            />
          </div>
          <div className="absolute w-100 h-100 bottom-[70px] right-0">
            <img className="w-full" src={Shaperigjt} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
