import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { PhoneMockup } from "@/components/phone-mockup";
import { Reveal } from "@/components/reveal";
import { StoreButtons } from "@/components/store-buttons";

export function DownloadCta() {
  return (
    <section id="get-the-app" className="bg-night relative overflow-hidden px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Image
        src="/images/hero-pitch.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[80%_center] opacity-35"
      />
      <div className="from-night via-night/85 to-night/40 absolute inset-0 bg-gradient-to-r" />
      <div className="subup-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <div className="bg-cyan/20 pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="flex flex-col items-start gap-6">
          <BrandLogo tone="cyan" height={30} href={null} />
          <h2 className="m-0 max-w-2xl text-[clamp(34px,6vw,64px)] leading-[1.04] font-extrabold tracking-[-0.04em] text-white">
            Ready when
            <br />
            your mates are.
          </h2>
          <p className="m-0 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Organise the kickabout, collect the cash, track the games, climb the ratings.
          </p>
          <StoreButtons variant="cta" />
        </Reveal>
        <Reveal delay={0.12} className="flex justify-center lg:justify-end">
          <PhoneMockup frame="home" />
        </Reveal>
      </div>
    </section>
  );
}
