import React from "react";
import { ThemeControls } from "../components/ThemeControls";
import { StepCarousel } from "../components/Home/StepCarousel";
import { AboutThunder } from "../components/Home/AboutThunder";
import { FAQ } from "../components/Home/FAQ";

const Home = () => {
  return (
    <div className="space-y-8">
      <AboutThunder />
      <StepCarousel />
      <FAQ />

      <ThemeControls />
    </div>
  );
};

export default Home;
