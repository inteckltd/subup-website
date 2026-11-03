"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  CheckIcon,
  ShuffleIcon,
  TrendingUpIcon,
  TrophyIcon,
  WalletIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const card =
  "group relative flex h-full flex-col gap-5 overflow-hidden rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7";

const ease = [0.22, 1, 0.36, 1] as const;

function Title({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h3
      className={cn(
        "m-0 text-2xl font-extrabold tracking-tight",
        light ? "text-white" : "text-primary",
      )}
    >
      {children}
    </h3>
  );
}

function Body({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "m-0 max-w-sm text-base leading-relaxed",
        light ? "text-white/75" : "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

/** Ticks up every `ms` while the demo is on screen. Stays at 0 for reduced motion. */
function useTick(active: boolean, ms: number) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [active, reduce, ms]);
  return tick;
}

function useDemo(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const tick = useTick(inView, ms);
  return { ref, inView, reduce: Boolean(reduce), tick };
}

function CountUp({
  from,
  to,
  run,
  tick,
  duration = 1.1,
}: {
  from: number;
  to: number;
  run: boolean;
  tick: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : from);
  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!run) return;
    setValue(from);
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [run, from, to, duration, reduce, tick]);
  return <>{Math.round(value).toLocaleString("en-GB")}</>;
}

/* 1. Collect the cash: a pay button that goes pay -> processing -> paid. */
const methods = ["Apple Pay", "Google Pay", "Card"];

function CashDemo() {
  const { ref, reduce, tick } = useDemo(1700);
  const phase = reduce ? 2 : tick % 3;
  const method = methods[Math.floor(tick / 3) % methods.length];

  return (
    <div ref={ref} className="relative mt-auto flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {methods.map((name) => (
          <span
            key={name}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors duration-300",
              name === method
                ? "border-cyan bg-cyan text-night"
                : "border-white/20 bg-white/10 text-white",
            )}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="relative h-14 overflow-hidden rounded-2xl bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-400"
          initial={false}
          animate={{ width: phase === 2 ? "100%" : phase === 1 ? "55%" : "0%" }}
          transition={{ duration: phase === 1 ? 1.2 : 0.4, ease: "easeInOut" }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase}
            className="absolute inset-0 flex items-center justify-center gap-2 text-base font-extrabold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {phase === 0 ? (
              <span className="text-white">Pay £4.50 with {method}</span>
            ) : phase === 1 ? (
              <span className="text-white">Taking payment…</span>
            ) : (
              <span className="text-night flex items-center gap-2">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  className="bg-night flex size-6 items-center justify-center rounded-full text-white"
                >
                  <CheckIcon className="size-4" aria-hidden />
                </motion.span>
                Paid. You’re in.
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 2. Know who's playing: ten slots fill up, then two join the waitlist. */
function LobbyDemo() {
  const { ref, inView, reduce, tick } = useDemo(8000);
  const run = inView || reduce;

  return (
    <div ref={ref} className="mt-auto">
      <div key={tick} className="flex flex-col gap-3">
        <div className="text-muted-foreground flex justify-between text-sm font-bold">
          <span>
            <CountUp from={0} to={8} run={run} tick={tick} duration={1.6} /> of
            10 in
          </span>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={run ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: reduce ? 0 : 2, duration: 0.4 }}
            className="text-amber-700"
          >
            2 on waitlist
          </motion.span>
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => {
            const filled = i < 8;
            return (
              <motion.span
                key={i}
                className={cn(
                  "h-9 rounded-lg",
                  filled ? "bg-primary" : "bg-secondary",
                )}
                initial={reduce ? false : { scaleY: 0.35, opacity: 0.4 }}
                animate={run ? { scaleY: 1, opacity: 1 } : undefined}
                transition={{
                  delay: reduce ? 0 : 0.15 * i,
                  duration: 0.4,
                  ease,
                }}
                style={{ originY: 1 }}
              />
            );
          })}
        </div>
        <div className="flex gap-1.5">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={run ? { opacity: 1, scale: 1 } : undefined}
              transition={{
                delay: reduce ? 0 : 2 + i * 0.15,
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
            >
              Waitlist {i + 1}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3. Fair teams: an uneven split reshuffles into a balanced one. */
const roster = [
  { name: "Sam", mmr: 1310 },
  { name: "Priya", mmr: 1255 },
  { name: "Dan", mmr: 1240 },
  { name: "Kai", mmr: 1250 },
  { name: "Tom", mmr: 1198 },
  { name: "Jess", mmr: 1172 },
  { name: "Mo", mmr: 1226 },
  { name: "Ali", mmr: 1205 },
];
const uneven = ["Sam", "Priya", "Dan", "Kai"];
const balanced = ["Sam", "Tom", "Mo", "Ali"];

function average(names: string[]) {
  const total = names.reduce(
    (sum, n) => sum + (roster.find((p) => p.name === n)?.mmr ?? 0),
    0,
  );
  return Math.round(total / names.length);
}

function Chip({ name, team }: { name: string; team: "blue" | "red" }) {
  return (
    <motion.span
      layoutId={`chip-${name}`}
      layout
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={cn(
        "flex size-9 items-center justify-center rounded-full text-sm font-extrabold",
        team === "blue" ? "bg-night text-white" : "text-night bg-white",
      )}
    >
      {name[0]}
    </motion.span>
  );
}

function TeamsDemo() {
  const { ref, reduce, tick } = useDemo(2600);
  const isBalanced = reduce ? true : tick % 2 === 1;
  const blue = isBalanced ? balanced : uneven;
  const red = roster.map((p) => p.name).filter((n) => !blue.includes(n));

  return (
    <div ref={ref} className="mt-auto flex flex-col gap-3">
      <LayoutGroup>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["Blue", blue, "blue", "bg-night/15"],
              ["Red", red, "red", "bg-white/60"],
            ] as const
          ).map(([label, names, team, bg]) => (
            <div
              key={label}
              className={cn("flex flex-col gap-2 rounded-2xl p-3", bg)}
            >
              <div className="flex items-center justify-between">
                <span className="text-night/70 text-xs font-bold">{label}</span>
                <span className="text-night text-sm font-extrabold tabular-nums">
                  {average([...names]).toLocaleString("en-GB")}
                </span>
              </div>
              <div className="grid min-h-[84px] grid-cols-2 content-start gap-1.5">
                {names.map((n) => (
                  <Chip key={n} name={n} team={team} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={String(isBalanced)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-night m-0 text-sm font-bold"
        >
          {isBalanced ? "Balanced from ratings" : "Uneven. Reshuffling…"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* 4. Man of the Match: votes come in and the winner is crowned. */
const votes = [
  { name: "Sam", count: 6 },
  { name: "Priya", count: 3 },
  { name: "Tom", count: 1 },
];

function MotmDemo() {
  const { ref, inView, reduce, tick } = useDemo(6000);
  const run = inView || reduce;

  return (
    <div ref={ref} className="mt-auto">
      <div key={tick} className="flex flex-col gap-2.5">
        {votes.map((vote, i) => (
          <div key={vote.name} className="flex items-center gap-3">
            <span className="w-10 text-sm font-bold text-white/80">
              {vote.name}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  i === 0 ? "bg-gold" : "bg-white/40",
                )}
                initial={reduce ? false : { width: 0 }}
                animate={
                  run ? { width: `${(vote.count / 6) * 100}%` } : undefined
                }
                transition={{
                  delay: reduce ? 0 : 0.2 + i * 0.25,
                  duration: 0.9,
                  ease,
                }}
              />
            </div>
            <span className="w-4 text-right text-sm font-extrabold text-white tabular-nums">
              <CountUp
                from={0}
                to={vote.count}
                run={run}
                tick={tick}
                duration={0.9 + i * 0.1}
              />
            </span>
          </div>
        ))}
        <motion.div
          className="bg-gold text-primary mt-1 flex items-center gap-2 self-start rounded-full px-3.5 py-1.5 text-sm font-extrabold"
          initial={reduce ? false : { opacity: 0, scale: 0.6, y: 8 }}
          animate={run ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{
            delay: reduce ? 0 : 1.5,
            type: "spring",
            stiffness: 380,
            damping: 16,
          }}
        >
          <TrophyIcon className="size-4" aria-hidden /> Man of the Match: Sam
        </motion.div>
      </div>
    </div>
  );
}

/* 5. Ratings: the line draws, the rating counts up. */
function RatingDemo() {
  const { ref, inView, reduce, tick } = useDemo(6500);
  const run = inView || reduce;

  return (
    <div ref={ref} className="mt-auto">
      <div key={tick} className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="bg-gold text-primary w-fit rounded-full px-3 py-1.5 text-sm font-extrabold whitespace-nowrap">
              <CountUp
                from={1218}
                to={1240}
                run={run}
                tick={tick}
                duration={1.4}
              />{" "}
              MMR
            </span>
            <motion.span
              className="text-sm font-extrabold text-emerald-700"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={run ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: reduce ? 0 : 1.3, duration: 0.4 }}
            >
              +22 after full time
            </motion.span>
          </div>
          <svg
            viewBox="0 0 140 48"
            className="text-primary h-12 w-36 overflow-visible"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M3 40 L28 30 L52 35 L78 20 L102 25 L134 6"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={run ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <motion.circle
              cx="134"
              cy="6"
              r="5"
              fill="currentColor"
              initial={reduce ? false : { scale: 0 }}
              animate={run ? { scale: 1 } : undefined}
              transition={{
                delay: reduce ? 0 : 1.3,
                type: "spring",
                stiffness: 500,
                damping: 14,
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="bg-background scroll-mt-14 px-5 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 sm:gap-10">
        <Reveal className="flex max-w-2xl flex-col gap-3">
          <p className="text-primary m-0 text-xs font-bold tracking-[0.2em] uppercase">
            Features
          </p>
          <h2 className="text-primary m-0 text-[clamp(30px,4.6vw,52px)] leading-[1.05] font-extrabold tracking-[-0.035em]">
            The admin, done for you.
          </h2>
        </Reveal>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-6">
          <Reveal className="lg:col-span-3">
            <div className={cn(card, "bg-primary")}>
              <div className="bg-cyan/20 pointer-events-none absolute -top-16 -right-16 size-56 rounded-full blur-3xl" />
              <span className="bg-cyan text-night relative flex size-11 items-center justify-center rounded-2xl">
                <WalletIcon className="size-5" aria-hidden />
              </span>
              <div className="relative flex flex-col gap-2">
                <Title light>Collect the cash</Title>
                <Body light>
                  The pitch money is collected in the app, with a SubUp fee on
                  top. Leave before the lock and you’re refunded.
                </Body>
              </div>
              <CashDemo />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className={cn(card, "border-primary/10 border bg-white")}>
              <span className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl">
                <CheckIcon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <Title>Know who’s playing</Title>
                <Body>
                  Max players, a waitlist and a lock window, so the lobby only
                  holds people who are coming.
                </Body>
              </div>
              <LobbyDemo />
            </div>
          </Reveal>

          <Reveal delay={0.04} className="lg:col-span-2">
            <div className={cn(card, "bg-cyan")}>
              <span className="bg-night flex size-11 items-center justify-center rounded-2xl text-white">
                <ShuffleIcon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-night m-0 text-2xl font-extrabold tracking-tight">
                  Fair teams
                </h3>
                <p className="text-night/80 m-0 text-base leading-relaxed">
                  Teams are balanced from ratings, so nobody argues over bibs.
                </p>
              </div>
              <TeamsDemo />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <div className={cn(card, "bg-night")}>
              <span className="bg-gold text-primary flex size-11 items-center justify-center rounded-2xl">
                <TrophyIcon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <Title light>Man of the Match</Title>
                <Body light>
                  Enter the score, then everyone votes. The winner gets a small
                  rating bump.
                </Body>
              </div>
              <MotmDemo />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <div className={cn(card, "border-primary/10 border bg-white")}>
              <span className="bg-secondary text-primary flex size-11 items-center justify-center rounded-2xl">
                <TrendingUpIcon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <Title>Ratings per group</Title>
                <Body>
                  Win, draw or lose and your MMR moves. The history stays with
                  the group.
                </Body>
              </div>
              <RatingDemo />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
