import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { HeroCards } from "@/components/hero-cards";
import { HeroFilm } from "@/components/hero-film";
import { Reveal } from "@/components/reveal";
import { StoreButtons } from "@/components/store-buttons";
import { filmPaths, site } from "@/lib/site";

function publicFileExists(urlPath: string) {
  return existsSync(path.join(process.cwd(), "public", urlPath));
}

export function Hero() {
  const hasVideo = publicFileExists(filmPaths.video);
  const hasPoster = publicFileExists(filmPaths.poster);

  return (
    <section className="bg-night relative -mt-[65px] overflow-hidden px-5 pt-[calc(65px+2.5rem)] pb-14 sm:px-6 sm:pt-[calc(65px+4rem)] sm:pb-20 lg:px-8">
      <Image
        src="/images/hero-pitch.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] opacity-80"
      />
      <div className="from-night via-night/80 to-night/20 absolute inset-0 bg-gradient-to-r" />
      <div className="from-night absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      <div className="subup-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col items-start gap-6">
          <Reveal onLoad>
            <p className="m-0 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-white uppercase backdrop-blur">
              <span className="bg-cyan size-2 rounded-full" />
              {site.kicker}
            </p>
          </Reveal>
          <Reveal onLoad delay={0.08}>
            <h1 className="m-0 text-[clamp(40px,8.5vw,76px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-white [&>span]:block">
              <span>{site.headline}</span>
              <span className="text-cyan">{site.headlineAccent}</span>
            </h1>
          </Reveal>
          <Reveal onLoad delay={0.16}>
            <p className="m-0 max-w-xl text-lg leading-8 text-white/75 sm:text-xl">{site.heroBody}</p>
          </Reveal>
          <Reveal onLoad delay={0.24} className="w-full">
            <div id="download">
              <StoreButtons variant="cta" />
            </div>
          </Reveal>
          <Reveal onLoad delay={0.32} className="w-full">
            <HeroFilm
              posterSrc={hasPoster ? filmPaths.poster : filmPaths.fallbackPoster}
              videoSrc={hasVideo ? filmPaths.video : null}
            />
          </Reveal>
        </div>
        <Reveal onLoad delay={0.2}>
          <HeroCards />
        </Reveal>
      </div>
    </section>
  );
}
