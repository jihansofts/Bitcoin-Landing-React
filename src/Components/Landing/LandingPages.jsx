import React from "react";
import Home from "../Home/Home";
import About from "../About/About";
import Course from "../Course/Course";
import Testimonials from "../Testimonials/Testimonials";
import FAQ from "../FAQ/Faq";
const LandingPages = () => {
  return (
    <main>
      <section id="/">
        <Home />
      </section>
      <section id="course">
        <Course />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq">
        <FAQ />
      </section>
    </main>
  );
};

export default LandingPages;
