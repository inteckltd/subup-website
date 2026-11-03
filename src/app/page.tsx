import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { DownloadCta } from "@/components/download-cta";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Problems } from "@/components/problems";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Problems />
      <HowItWorks />
      <Features />
      <DownloadCta />
      <ContactSection />
    </main>
  );
}
