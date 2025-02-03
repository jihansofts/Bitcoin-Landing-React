import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Course from "./Components/Course/Course";
import Testimonials from "./Components/Testimonials/Testimonials";
import FAQ from "./Components/FAQ/Faq";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
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
    </>
  );
}

export default App;
