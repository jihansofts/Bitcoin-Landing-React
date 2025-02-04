import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import Logo from "../../assets/img/Logo.png";
import FooterShape from "../../assets/img/footer.png"; // Import the image

const Footer = () => {
  return (
    <div
      className="relative bg-cover bg-no-repeat h-auto bg-center"
      style={{ backgroundImage: `url(${FooterShape})` }} // Set image as background
    >
      <div className="container mx-auto py-20 px-4 ">
        {/* Logo */}
        <div className="grid grid-cols-12 max-sm:text-center gap-x-40 max-2xl:gap-x-32 max-xl:gap-x-20 max-lg:gap-x-10 max-md:gap-x-4 max-sm:gap-2">
          <div className="col-span-4 max-sm:col-span-12 max-sm:mx-auto">
            <img className="w-[200px]" src={Logo} alt="Logo" />
          </div>
          <div className="col-span-4 max-sm:col-span-12 max-sm:mt-5">
            <div className="flex flex-col gap-y-10 max-sm:gap-y-5">
              <h4 className="text-[24px] text-bgPrimary font-Inter font-semibold">
                Terms And Policies
              </h4>
              <a
                href=""
                className="text-[16px] text-bgPrimary font-Inter font-light">
                Terms Of Use
              </a>
              <a
                href=""
                className="text-[16px] text-bgPrimary font-Inter font-light">
                Privacy Policy
              </a>
              <a
                href=""
                className="text-[16px] text-bgPrimary font-Inter font-light">
                Cookies Policy
              </a>
              <a
                href=""
                className="text-[16px] text-bgPrimary font-Inter font-light">
                Disclaimer
              </a>
            </div>
          </div>
          <div className="col-span-4 max-sm:col-span-12 max-sm:mt-5">
            <div className="flex flex-col max-sm:items-center gap-y-10 max-sm:gap-y-5">
              <h4 className="text-[24px] text-bgPrimary font-Inter font-semibold">
                Contact Us
              </h4>
              <p className="text-[18px] text-bgPrimary font-Inter font-light">
                support@5mincoin.com
              </p>
              <div>
                <ul className="flex gap-4">
                  {" "}
                  <li className=" bg-bgPrimary w-8 h-8 rounded-full flex justify-center items-center">
                    <FaXTwitter className="text-[18px] text-white cursor-pointer hover:text-gray-300" />
                  </li>
                  <li className=" bg-bgPrimary w-8 h-8 rounded-full flex justify-center items-center">
                    <FaInstagram className="text-[18px] text-white cursor-pointer hover:text-gray-300" />
                  </li>
                  <li className=" bg-bgPrimary w-8 h-8 rounded-full flex justify-center items-center">
                    <FaFacebookF className="text-[18px] text-white cursor-pointer hover:text-gray-300" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
