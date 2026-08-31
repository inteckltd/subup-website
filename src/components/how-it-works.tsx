import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Get invited to group",
    body: "Join an invite-only football squad with your mates. Private groups, not a public marketplace.",
    image: "/images/auth-hero.jpg",
    imageAlt: "Footballers on the pitch at sunset",
    icon: "/icons/users.svg",
    iconRotate: "rotate-6",
    iconBg: "bg-cyan",
    featured: false,
  },
  {
    n: "02",
    title: "Join game",
    body: "Pay through the app to take your spot. No pay, no spot — so the lobby is people who are actually coming.",
    image: "/images/marketing/how-play.jpg",
    imageAlt: "A football on the grass",
    icon: "/icons/game.svg",
    iconRotate: "-rotate-6",
    iconBg: "bg-cyan",
    featured: true,
  },
  {
    n: "03",
    title: "Play & level up",
    body: "After kickoff, log the score, vote Man of the Match, and watch ratings update with the group.",
    image: "/images/marketing/feature-motm.jpg",
    imageAlt: "A floodlit football stadium",
    icon: "/icons/trophy.svg",
    iconRotate: "rotate-3",
    iconBg: "bg-gold",
    featured: false,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24 sm:py-32 lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 lg:gap-24">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-cyan h-px w-8" />
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                The playbook
              </span>
            </div>
            <h2 className="text-primary m-0 text-[clamp(40px,8vw,96px)] leading-none font-extrabold tracking-[-0.05em]">
              How it Works
            </h2>
          </div>
          <p className="text-muted-foreground m-0 max-w-sm text-sm font-bold tracking-[0.1em] uppercase">
            From your first invite to a fair game, paid and recorded.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} className="relative">
              <span className="text-primary/[0.03] pointer-events-none absolute -top-6 -left-2 text-[120px] leading-none font-extrabold italic sm:text-[192px]">
                {step.n}
              </span>
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[48px] border p-10 shadow-[0px_10px_40px_-10px_rgba(3,36,136,0.08)]",
                  step.featured
                    ? "border-primary bg-primary text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
                    : "border-border bg-background",
                )}
              >
                <div
                  className={cn(
                    "mb-10 flex size-16 items-center justify-center overflow-hidden rounded-2xl",
                    step.iconBg,
                    step.iconRotate,
                  )}
                >
                  <Image
                    src={step.icon}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="size-6 object-contain"
                  />
                </div>
                <h3
                  className={cn(
                    "mb-4 text-3xl font-extrabold tracking-tight uppercase",
                    step.featured ? "text-white" : "text-primary",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "mb-8 min-h-20 text-base leading-relaxed",
                    step.featured ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {step.body}
                </p>
                <div className="relative mt-auto aspect-[4/3] overflow-hidden rounded-[32px]">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
