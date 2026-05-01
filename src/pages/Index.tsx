import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { IntroLoader } from "@/components/birthday/IntroLoader";
import { HeroSection } from "@/components/birthday/HeroSection";
import { FloatingCompliments } from "@/components/birthday/FloatingCompliments";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { WhySpecialSection } from "@/components/birthday/WhySpecialSection";
import { CinematicScene3D } from "@/components/birthday/CinematicScene3D";
import { FinalReveal } from "@/components/birthday/FinalReveal";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <main className="relative w-full bg-background text-foreground overflow-x-hidden">
      {!loaded && <IntroLoader onComplete={() => setLoaded(true)} />}

      <HeroSection />
      <FloatingCompliments />
      <MemoryGallery />
      <WhySpecialSection />
      <CinematicScene3D />
      <FinalReveal />
    </main>
  );
};

export default Index;
