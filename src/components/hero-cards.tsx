"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CheckIcon, TrophyIcon } from "lucide-react";
import { PhoneMockup } from "@/components/phone-mockup";
import { cn } from "@/lib/utils";

function Float({
  children,
  className,
  rotate = 0,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  return (
    <div
      className={cn("subup-float", className)}
      style={{ ["--r" as string]: `${rotate}deg`, animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function GameCard() {
  return (
    <div className="w-[250px] rounded-3xl border border-white/60 bg-white p-4 shadow-[0px_30px_60px_-20px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between">
        <span className="text-primary text-xs font-bold">Wed 7:30pm</span>
        <span className="bg-secondary text-primary rounded-full px-2 py-0.5 text-[11px] font-bold">8 of 10 in</span>
      </div>
      <p className="text-foreground m-0 mt-2 text-base font-extrabold">Woolston 5-a-side</p>
      <p className="text-muted-foreground m-0 text-xs">Soccer Dome · £4.50 a head</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {["S", "P", "T", "D"].map((l) => (
            <span
              key={l}
              className="bg-secondary text-primary flex size-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-extrabold"
            >
              {l}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
          <CheckIcon className="size-3.5" aria-hidden /> You’ve paid
        </span>
      </div>
    </div>
  );
}

function MotmCard() {
  return (
    <div className="flex w-[230px] items-center gap-3 rounded-3xl border border-white/60 bg-white p-4 shadow-[0px_30px_60px_-20px_rgba(0,0,0,0.55)]">
      <span className="bg-gold text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
        <TrophyIcon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-muted-foreground m-0 text-[11px] font-bold tracking-wider uppercase">Man of the Match</p>
        <p className="text-foreground m-0 text-base font-extrabold">Sam · 6–4 win</p>
      </div>
    </div>
  );
}

function RatingCard() {
  return (
    <div className="bg-night-2 flex items-center gap-3 rounded-full border border-white/15 py-2.5 pr-5 pl-2.5 shadow-[0px_20px_40px_-15px_rgba(0,0,0,0.6)]">
      <span className="bg-gold text-primary rounded-full px-3 py-1.5 text-xs font-extrabold whitespace-nowrap">
        1,240 MMR
      </span>
      <span className="text-sm font-bold text-white">+22 after full time</span>
    </div>
  );
}

export function HeroCards() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const slow = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -50]);
  const fast = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -110]);

  return (
    <>
      {/* Phone-sized screens: two cards, no overlap tricks. */}
      <div className="flex flex-col items-start gap-3 lg:hidden">
        <GameCard />
        <div className="self-end">
          <MotmCard />
        </div>
      </div>

      {/* Desktop: phone with cards floating around it. */}
      <div className="relative hidden h-[640px] lg:block">
        <motion.div style={{ y: slow }} className="absolute top-0 left-1/2 -translate-x-[40%]">
          <PhoneMockup frame="lobby" />
        </motion.div>
        <motion.div style={{ y: fast }} className="absolute top-24 left-0">
          <Float rotate={-5}>
            <GameCard />
          </Float>
        </motion.div>
        <motion.div style={{ y: fast }} className="absolute right-0 bottom-28">
          <Float rotate={4} delay={1.5}>
            <MotmCard />
          </Float>
        </motion.div>
        <motion.div style={{ y: slow }} className="absolute bottom-6 left-6">
          <Float rotate={-2} delay={3}>
            <RatingCard />
          </Float>
        </motion.div>
      </div>
    </>
  );
}
