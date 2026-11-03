"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { CheckIcon, CreditCardIcon, TrophyIcon, UsersIcon } from "lucide-react";
import { PhoneMockup, type PhoneFrameName } from "@/components/phone-mockup";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Get invited",
    body: "Join an invite-only group with your mates. Admins invite by mobile, so your squad stays private.",
    icon: UsersIcon,
    frame: "invite" as PhoneFrameName,
    chip: "Invite accepted",
  },
  {
    n: "02",
    title: "Pay your spot",
    body: "Take your place with Apple Pay, Google Pay or card. The lobby is full of people who are actually coming.",
    icon: CreditCardIcon,
    frame: "lobby" as PhoneFrameName,
    chip: "£4.50 paid · you’re in",
  },
  {
    n: "03",
    title: "Score and vote",
    body: "After the game, log the score and vote Man of the Match. Ratings update and the history stays with the group.",
    icon: TrophyIcon,
    frame: "result" as PhoneFrameName,
    chip: "+22 MMR for Sam",
  },
];

function Heading() {
  return (
    <Reveal className="flex max-w-xl flex-col gap-3">
      <p className="text-primary m-0 text-xs font-bold tracking-[0.2em] uppercase">How it works</p>
      <h2 className="text-primary m-0 text-[clamp(30px,4.6vw,52px)] leading-[1.05] font-extrabold tracking-[-0.035em]">
        From invite to full-time in three steps.
      </h2>
    </Reveal>
  );
}

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length))));
  });

  const step = steps[active];

  return (
    <div ref={ref} className="relative hidden h-[240vh] lg:block">
      <div className="sticky top-[65px] flex h-[calc(100vh-65px)] items-center">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto] items-center gap-16 px-8">
          <div className="flex flex-col gap-10">
            <Heading />
            <ol className="relative m-0 flex list-none flex-col gap-2 p-0 pl-8">
              <span className="bg-primary/15 absolute top-2 bottom-2 left-[7px] w-0.5 rounded-full" />
              <motion.span
                className="bg-primary absolute top-2 bottom-2 left-[7px] w-0.5 origin-top rounded-full"
                style={{ scaleY: scrollYProgress }}
              />
              {steps.map((item, index) => (
                <li
                  key={item.n}
                  className={cn(
                    "relative rounded-3xl p-5 transition-all duration-300",
                    index === active ? "bg-white shadow-[0px_20px_40px_-20px_rgba(3,36,136,0.35)]" : "opacity-55",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-7 -left-[29px] size-4 rounded-full border-2 transition-colors duration-300",
                      index <= active ? "border-primary bg-primary" : "border-primary/30 bg-secondary",
                    )}
                  />
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
                        index === active ? "bg-primary text-white" : "bg-white text-primary",
                      )}
                    >
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-primary m-0 text-xl font-extrabold tracking-tight">{item.title}</h3>
                      <p className="text-muted-foreground m-0 mt-1 max-w-md text-base leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative flex w-[420px] items-center justify-center [@media(max-height:820px)]:scale-[0.85]">
            <div className="bg-primary/20 absolute size-[380px] rounded-full blur-3xl" />
            <div className="bg-cyan/30 absolute -top-4 -right-4 size-40 rounded-full blur-3xl" />
            <PhoneMockup frame={step.frame} />
            <AnimatePresence mode="wait">
              <motion.div
                key={step.chip}
                initial={reduce ? false : { opacity: 0, x: 24, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
                className="bg-night absolute top-24 -right-4 flex items-center gap-2 rounded-full border border-white/15 py-2 pr-4 pl-2 text-sm font-bold text-white shadow-2xl"
              >
                <span className="bg-cyan text-night flex size-7 items-center justify-center rounded-full">
                  <CheckIcon className="size-4" aria-hidden />
                </span>
                {step.chip}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedStory() {
  return (
    <div className="flex flex-col gap-8 lg:hidden">
      <Heading />
      <ol className="m-0 grid list-none gap-3 p-0">
        {steps.map((item, index) => (
          <Reveal as="li" key={item.n} delay={index * 0.08}>
            <div
              className={cn(
                "flex gap-4 rounded-3xl p-5",
                index === 1 ? "bg-primary text-white" : "border-primary/10 border bg-white",
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                  index === 1 ? "bg-cyan text-night" : "bg-secondary text-primary",
                )}
              >
                <item.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className={cn("m-0 text-xl font-extrabold tracking-tight", index === 1 ? "text-white" : "text-primary")}>
                  {item.title}
                </h3>
                <p className={cn("m-0 mt-1 text-base leading-relaxed", index === 1 ? "text-white/80" : "text-muted-foreground")}>
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal className="flex justify-center pt-2">
        <PhoneMockup frame="lobby" />
      </Reveal>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary scroll-mt-14 px-5 py-14 sm:px-6 sm:py-20 lg:p-0">
      <div className="mx-auto w-full max-w-[1280px] lg:max-w-none">
        <StackedStory />
        <PinnedStory />
      </div>
    </section>
  );
}
