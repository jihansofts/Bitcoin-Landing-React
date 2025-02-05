import React, { useState } from "react";
import CardShape from "../../assets/img/CardShape.png";
const Card = ({ data, onOpenModal }) => {
  const Course = data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      {Course.map((item) => (
        <div key={item.id} className="col-span-1 relative">
          {/* Card Image */}
          <img
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl"
            src={item.image}
            alt="Course"
          />
          {/* Content Area with CardShape Background */}
          <div className="relative bg-bgSecondary flex flex-col items-start text-start py-6 px-5 sm:py-8 sm:px-6 md:py-10 md:px-7 rounded-b-2xl font-Inter font-semibold overflow-hidden">
            {/* CardShape Background */}
            <img
              className="absolute bottom-0 left-0 w-full h-auto z-0"
              src={CardShape}
              alt="Card Background"
            />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-white text-[26px] max-xl:text-[20px] max-lg:text-[24px] max-sm:text-[28px] max-md:text-[32px] font-Inter font-semibold">
                {item.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] font-Inter font-light text-white mt-4 sm:mt-5">
                {item.description}
              </p>
              <div className="flex items-center justify-between w-full mt-4 sm:mt-5">
                <span className="text-[14px] sm:text-[16px] md:text-[18px] font-Inter font-bold text-white">
                  {item.participants} Participants
                </span>
                <span className="text-[14px] sm:text-[16px] md:text-[18px] font-Inter font-bold text-white">
                  {item.price} Free
                </span>
              </div>
              <button
                onClick={() => onOpenModal(true)}
                className="text-[14px] sm:text-[16px] md:text-[18px] mt-6 sm:mt-8 cursor-pointer w-full bg-buttonColor py-2 sm:py-3 px-5 sm:px-7 rounded-3xl font-Inter font-bold text-bgPrimary hover:bg-opacity-90 transition-all">
                Take Course
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
