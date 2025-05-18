import CTASection from "@/components/shared/CTASection";
import FeaturesSection from "@/components/shared/FeaturesSection";
import HeroSection from "@/components/shared/HeroSection";
import StatsSection from "@/components/shared/StatsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import UserDashboard from "@/components/shared/UserDashboard";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <UserDashboard />
    </div>
  );
};

export default Home;
