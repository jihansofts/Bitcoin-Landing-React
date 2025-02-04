import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Shape from "../../assets/img/shape.png";

const faqs = [
  {
    question: "1. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    question: "2. Lorem Ipsusm Doler Sumit?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    question: "3. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    question: "4. Lorem Ipsum Dolor Sit Amet?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  },
  {
    question: "Lorem Ipsusm Doler Sumit?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // Set first question open by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full relative bg-bgPrimary py-20">
      <div className="absolute w-100 h-100 top-[50px] left-0">
        <img className="w-full" src={Shape} alt="" />
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h4 className="text-[24px] font-Inter text-buttonColor font-bold">
            FAQ
          </h4>
          <h2 className="relative text-[60px] max-lg:text-[50px] max-md:text-[40px] font-Inter text-white font-bold">
            Most Common{" "}
            <span className="relative inline-block group">
              <span className="relative z-10">Questions</span>
              <span className="absolute left-0 bottom-5 w-full h-[35px] bg-bgSecondary opacity-50 z-0"></span>
            </span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="w-full mt-5 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl transition-all ${
                openIndex === index
                  ? "bg-bgSecondary h-[200px] max-md:h-auto"
                  : "border-2 border-bgSecondary"
              }`}>
              {/* Question Section */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFaq(index)}>
                <h5 className="text-[24px] text-white font-Inter font-semibold">
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
                <p className="text-[16px] lg:text-[18px] font-Inter font-light text-white mt-3 lg:mt-5 leading-8">
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
