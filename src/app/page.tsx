import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { DownloadCta } from "@/components/download-cta";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LogoTicker } from "@/components/logo-ticker";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <LogoTicker />
      <HowItWorks />
      <Features />
      <DownloadCta />
      <ContactSection />
    </main>
  );
}
