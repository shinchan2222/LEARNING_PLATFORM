'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/seceon/Navbar';
import { HeroSection } from '@/components/seceon/HeroSection';
import { StatsBar } from '@/components/seceon/StatsBar';
import { Ticker } from '@/components/seceon/Ticker';
import { AutonomousSOC } from '@/components/seceon/AutonomousSOC';
import { ProductSuite } from '@/components/seceon/ProductSuite';
import { ModuleExploration } from '@/components/seceon/ModuleExploration';
import { CapabilitiesGrid } from '@/components/seceon/CapabilitiesGrid';
import { UseCasesAndServices } from '@/components/seceon/UseCasesAndServices';
import { WhySeceonComparison } from '@/components/seceon/WhySeceonComparison';
import { RoiCalculator } from '@/components/seceon/RoiCalculator';
import { IndustriesSection } from '@/components/seceon/IndustriesSection';
import { PartnersSection } from '@/components/seceon/PartnersSection';
import { TestimonialsAndAwards } from '@/components/seceon/TestimonialsAndAwards';
import { Footer } from '@/components/seceon/Footer';
import { AppointmentModal } from '@/components/seceon/AppointmentModal';

export default function SeceonHomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDemoModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#071323] text-slate-100 flex flex-col font-sans selection:bg-[#5A9955] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section: "Our AI Kills Active Attacks in 90 Seconds" + Interactive Cyber Simulator */}
        <HeroSection onOpenDemoModal={handleOpenDemoModal} />

        {/* 2. Key Telemetry & Statistics Bar */}
        <StatsBar />

        {/* 3. Real-Time Marquee Ticker */}
        <Ticker />

        {/* 4. Autonomous SOC Architecture & Gartner Recognition Card */}
        <AutonomousSOC onOpenDemoModal={handleOpenDemoModal} />

        {/* 5. Core Product Suite (aiSIEM, aiXDR-PMAX, aiSIEM CGuard, SERA AI) */}
        <ProductSuite onOpenDemoModal={handleOpenDemoModal} />

        {/* 6. Live Interactive Module Exploration (01 aiTRiSM to 05 SecROI) */}
        <ModuleExploration onOpenDemoModal={handleOpenDemoModal} />

        {/* 7. Open Threat Management Platform: 16 Core Capabilities Grid */}
        <CapabilitiesGrid onOpenDemoModal={handleOpenDemoModal} />

        {/* 8. Featured Threat Use Cases & Partner-Led Services */}
        <UseCasesAndServices onOpenDemoModal={handleOpenDemoModal} />

        {/* 9. Legacy SIEM vs Seceon Market Comparison Table */}
        <WhySeceonComparison onOpenDemoModal={handleOpenDemoModal} />

        {/* 10. Interactive SecROI360 Calculator */}
        <RoiCalculator onOpenDemoModal={handleOpenDemoModal} />

        {/* 11. Industries Deep-Dive (Financial, Healthcare, Government, etc.) */}
        <IndustriesSection onOpenDemoModal={handleOpenDemoModal} />

        {/* 12. Partner Ecosystem: MSP, MSSP, Enterprise */}
        <PartnersSection onOpenDemoModal={handleOpenDemoModal} />

        {/* 13. Customer Testimonials, Executive Spotlight & Awards Grid */}
        <TestimonialsAndAwards onOpenDemoModal={handleOpenDemoModal} />
      </main>

      {/* Global Footer */}
      <Footer onOpenDemoModal={handleOpenDemoModal} />

      {/* Interactive Appointment & Demo Booking Modal */}
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseDemoModal} 
      />
    </div>
  );
}
