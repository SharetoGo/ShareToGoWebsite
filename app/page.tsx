"use client";
import Hero from "@/components/hero";
import AdvancedParallaxZoom from "@/components/AdvancedParallaxZoom";
import FeaturesBlocks from "@/components/features-blocks";
import HowItWorks from "@/components/how-it-works";
import EnterpriseIntro from "@/components/enterprise-intro";
import EnterpriseCards from "@/components/enterprise-cards";
import ByteWay from "@/components/bytheway";

export default function Home() {
  return (
    <main className="scroll-smooth bg-[#f9fafb]">
      <Hero />

      <div className="hidden md:block">
        <AdvancedParallaxZoom
          imageSrc="/images/carpool-people.jpg"
          title="Amplia tu visión"
          height="250vh"
          imageAlt="App preview"
        />
      </div>

      <FeaturesBlocks />

      <HowItWorks />

      <ByteWay />

      <EnterpriseIntro />

      <EnterpriseCards />
    </main>
  );
}
