"use client";

import {
  ParticleField,
  MouseGlow,
  FloatingOrbs,
} from "@/components/backgrounds";
import { Navigation } from "@/components/Navigation";
import {
  HeroSection,
  FeatureSection,
  GallerySection,
  CtaSection,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Background Effects */}
      <div className="dream-bg" />
      <ParticleField />
      <FloatingOrbs />
      <MouseGlow />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="page-wrapper">
        <HeroSection />
        <FeatureSection />
        <GallerySection />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
