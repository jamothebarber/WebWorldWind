import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { VoiceDemoSection } from "@/components/sections/voice-demo-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ResultsSection } from "@/components/sections/results-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <VoiceDemoSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <ResultsSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
