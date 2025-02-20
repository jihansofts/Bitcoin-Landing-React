import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 1, name: "Home", target: "/" },
    { id: 2, name: "Course", target: "course" },
    { id: 3, name: "About", target: "about" },
    { id: 4, name: "Testimonials", target: "testimonials" },
    { id: 5, name: "FAQ", target: "faq" },
  ];
    const scrollToCourse = () => {
    const courseSection = document.getElementById("course");
    if (courseSection) {
      courseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full overflow-hidden bg-white max-lg:h-auto py-7">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always Navigate to Home */}
          <NavLink to="/" onClick={() => setActiveItem("Home")}>
            <img className="w-[120px]" src={Logo} alt="Logo" />
          </NavLink>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between">
            <ul className="flex items-center space-x-16 max-xl:space-x-10">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`relative font-Inter font-medium cursor-pointer ${
                    activeItem === item.name
                      ? "text-bgSecondary font-bold text-[18px]"
                      : "text-[#57886F] font-medium text-[16px]"
                  }`}
                  onClick={() => setActiveItem(item.name)}>
                  {item.name === "Home" ? (
                    <NavLink to="/" onClick={() => setActiveItem("Home")}>
                      {item.name}
                    </NavLink>
                  ) : (
                    <Link
                      to={item.target}
                      smooth={true}
                      duration={500}
                      spy={true}
                      activeClass="active"
                      onSetActive={() => setActiveItem(item.name)}>
                      {item.name}
                    </Link>
                  )}
                  {activeItem === item.name && (
                    <motion.span
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-bgSecondary rounded-full"
                      layoutId="activeItem"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-bgSecondary cursor-pointer text-2xl"
            onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Sign Up / Dashboard Button */}
          <button
            onClick={scrollToCourse}
            className="hidden cursor-pointer lg:block border-2 border-bgSecondary font-Inter text-[16px] font-bold text-bgSecondary rounded-4xl px-10 py-2">
           Get
            Started
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className={`relative font-Inter font-medium cursor-pointer ${
                      activeItem === item.name
                        ? "text-bgSecondary font-bold text-[18px]"
                        : "text-[#57886F] font-medium text-[16px]"
                    }`}
                    onClick={() => {
                      setActiveItem(item.name);
                      setIsMobileMenuOpen(false); // Close mobile menu after clicking
                    }}>
                    {item.name === "Home" ? (
                      <NavLink
                        to="/"
                        onClick={() => {
                          setActiveItem("Home");
                          setIsMobileMenuOpen(false);
                        }}>
                        {item.name}
                      </NavLink>
                    ) : (
                      <Link
                        to={item.target}
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass="active"
                        onSetActive={() => setActiveItem(item.name)}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu after clicking
                      >
                        {item.name}
                      </Link>
                    )}
                    {activeItem === item.name && (
                      <motion.span
                        className="absolute -bottom-2 left-[25px] transform -translate-x-1/2 w-1.5 h-1.5 bg-bgSecondary rounded-full"
                        layoutId="activeItemMobile"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
