import React, { Suspense } from "react";

// Lazy load components
const Home = React.lazy(() => import("../Home/Home"));
const About = React.lazy(() => import("../About/About"));
const Course = React.lazy(() => import("../Course/Course"));
const Testimonials = React.lazy(() => import("../Testimonials/Testimonials"));
const FAQ = React.lazy(() => import("../FAQ/Faq"));

const LandingPages = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </main>
  );
};

export default LandingPages;
