import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import FeaturesSection from "@/components/shared/FeaturesSection";
import StatsSection from "@/components/shared/StatsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CTASection from "@/components/shared/CTASection";

const RootLayout = () => {
  return (
    <div className="w-full flex-col md:flex">
      <Header />

      <section className="">
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
