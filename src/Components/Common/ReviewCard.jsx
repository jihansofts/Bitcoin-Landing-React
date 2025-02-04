import React from "react";
import { MdOutlineStar } from "react-icons/md";
import Client1 from "../../assets/img/client1.png";
const ReviewCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div
        key={data.id}
        className="bg-bgPrimary p-8 rounded-2xl w-[450px] h-[250px]">
        <div className="flex items-center gap-5">
          <img className="w-12 h-12" src={data.image} alt="" />
          <div>
            <h4 className="text-[20px] text-white font-Inter font-semibold">
              {data.name}
            </h4>
            <span className="text-[#808D9E] text-[14px] font-Inter font-medium">
              {data.company}
            </span>
          </div>
        </div>
        <div>
          <p className="text-[16px] text-white font-Inter font-light mt-5">
            {data.review}
          </p>
          <div>
            <div className="flex items-center gap-1 mt-5">
              <MdOutlineStar className="text-[#EACD86] text-[20px]" />
              <MdOutlineStar className="text-[#EACD86] text-[20px]" />
              <MdOutlineStar className="text-[#EACD86] text-[20px]" />
              <MdOutlineStar className="text-[#EACD86] text-[20px]" />
              <MdOutlineStar className="text-[#EACD86] text-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
