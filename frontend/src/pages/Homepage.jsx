import React from "react";
import HeroSection from "../components/HeroSection";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";


function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <HeroSection />
      <Section1 />
      <Section2 />
      <Section3 />
    </main>
  );
}

export default HomePage;
