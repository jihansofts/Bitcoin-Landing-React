import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReviewsData } from "../../Helper/Data";
import ReviewCard from "../Common/ReviewCard";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enableAnimation, setEnableAnimation] = useState(true);
  const DataReview = ReviewsData;

  // Detect screen width and disable animation on max-md (≤768px)
  useEffect(() => {
    const handleResize = () => {
      setEnableAnimation(window.innerWidth > 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-bgSecondary py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
          Testimonials
        </h4>
        <h1 className="text-[48px] max-sm:text-[32px] font-Inter text-white font-bold">
          What customers say about <br /> Fiveminutebitcoin
        </h1>
      </div>

      {/* Testimonials Container */}
      <div className="relative w-full mx-auto mt-10 overflow-hidden">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
          {[0, 1].map((row) =>
            enableAnimation ? (
              <motion.div
                key={row}
                initial={{ x: row === 0 ? "100%" : "-100%" }}
                animate={{ x: row === 0 ? "-100%" : "100%" }}
                transition={{
                  ease: "linear",
                  duration: 20,
                  repeat: Infinity,
                  delay: row * 10,
                }}
                className="flex w-full justify-center sm:justify-start gap-3 sm:gap-6 lg:gap-8 xl:gap-10 flex-wrap xl:flex-nowrap">
                {DataReview.slice(row * 4, row * 4 + 4).map((review, index) => (
                  <div key={index} className="flex-shrink-0">
                    <ReviewCard data={review} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <div
                key={row}
                className="flex w-auto justify-center sm:justify-center gap-3 sm:gap-6 lg:gap-8 xl:gap-10 flex-wrap xl:flex-nowrap">
                {DataReview.slice(row * 4, row * 4 + 4).map((review, index) => (
                  <div key={index} className="flex-shrink-1 max-sm:mx-4">
                    <ReviewCard data={review} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`w-16 h-[5px] transition-colors duration-300 ${
              i === activeIndex ? "bg-buttonColor" : "bg-white"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
