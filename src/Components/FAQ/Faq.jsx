import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { faqs } from "../../Helper/Data";
import Shape from "../../assets/img/shape.png";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // Set first question open by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full relative overflow-hidden bg-bgPrimary py-20">
     <div className="absolute top-0 left-0 w-100 h-auto z-0">
    <img className="w-full h-full object-cover " src={Shape} alt="Background Shape" />
  </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center">
          <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
            FAQ
          </h4>
          <h2 className="relative text-[60px] max-lg:text-[50px] max-md:text-[40px] max-sm:text-[32px] font-Inter text-white font-bold">
            Most Common{" "}
            <span className="relative inline-block group">
              <span className="relative z-10">Questions</span>
              <span className="absolute left-0 bottom-5 max-sm:bottom-0 max-md:bottom-1 max-lg:bottom-2 w-full h-[35px] bg-bgSecondary opacity-50 z-0"></span>
            </span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="w-full mt-5  space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`p-6 rounded-2xl z-50  transition-all ${
                openIndex === index
                  ? "bg-bgSecondary z-50 h-[200px] max-md:h-auto"
                  : "border-2 border-bgSecondary"
              }`}>
              {/* Question Section */}
              <div
                className="flex z-50 items-center justify-between cursor-pointer"
                onClick={() => toggleFaq(index)}>
                <h5 className="text-[24px] max-sm:text-[20px] text-white font-Inter font-semibold">
                  {faq.question}
                </h5>
                {openIndex === index ? (
                  <IoIosArrowUp className="text-white text-2xl" />
                ) : (
                  <IoIosArrowDown className="text-white text-2xl" />
                )}
              </div>

              {/* Answer Section (Animated) */}
              <motion.div
                initial={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-[80%] ml-4">
                <p className="text-[20px] lg:text-[18px] font-Inter font-bold text-white mt-3 lg:mt-5 leading-8">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
