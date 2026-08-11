import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";

// Temporary self-preview route for visually checking the How It Works and
// Capabilities sections in isolation. Safe to leave in place.
export default function DevPreviewHowCapabilitiesPage() {
  return (
    <>
      <HowItWorksSection />
      <CapabilitiesSection />
    </>
  );
}
