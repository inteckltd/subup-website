import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Collect the cash",
    body: "Pitch money is collected in the app. No more chasing people who didn’t pay — no pay, no spot.",
    image: "/images/marketing/feature-pay.jpg",
    imageAlt: "A footballer in action",
    icon: "/icons/chart.svg",
    iconBg: "bg-gold",
    offset: "lg:mt-0",
  },
  {
    title: "Automated assignments",
    body: "Teams are drawn automatically from MMR so both sides stay fair, without a captain arguing over bibs.",
    image: "/images/marketing/feature-teams.jpg",
    imageAlt: "Abstract data lines",
    icon: "/icons/shuffle.svg",
    iconBg: "bg-cyan",
    offset: "lg:mt-20",
  },
  {
    title: "MOTM & history",
    body: "Vote Man of the Match after kickoff. Scores, votes, and ratings stay with the group so you can see who’s in form.",
    image: "/images/marketing/feature-motm.jpg",
    imageAlt: "A stadium under floodlights",
    icon: "/icons/trophy.svg",
    iconBg: "bg-cyan",
    offset: "lg:mt-40",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background relative overflow-hidden px-6 py-24 sm:py-32 lg:px-20">
      <div className="bg-cyan/5 pointer-events-none absolute inset-[20%_10%] rounded-full blur-[60px]" />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-16 lg:gap-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="bg-cyan h-px w-6" />
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Game features
            </span>
            <span className="bg-cyan h-px w-6" />
          </div>
          <h2 className="text-primary m-0 text-[clamp(40px,8vw,96px)] leading-none font-extrabold tracking-[-0.05em] italic">
            Built For Elite Play
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {features.map((feature) => (
            <article key={feature.title} className={cn("relative", feature.offset)}>
              <div className="border-border relative overflow-hidden rounded-[48px] border bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
                <div className="relative h-[420px] sm:h-[498px]">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover grayscale"
                    sizes="(min-width: 1024px) 380px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032488] via-[#032488]/20 to-transparent opacity-90" />
                </div>
                <div className="absolute inset-x-8 bottom-8 flex flex-col items-start gap-2">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center overflow-hidden rounded-xl",
                      feature.iconBg,
                    )}
                  >
                    <Image
                      src={feature.icon}
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className="size-5 object-contain"
                    />
                  </span>
                  <h3 className="m-0 text-3xl font-extrabold tracking-tight text-white uppercase">
                    {feature.title}
                  </h3>
                  <p className="m-0 text-sm leading-relaxed text-white/60">{feature.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
