"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckIcon, ClockIcon, TrophyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function MmrPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gold text-primary shrink-0 rounded-full px-2.5 whitespace-nowrap py-1 text-[11px] font-extrabold">{children}</span>
  );
}

function Header({ title }: { title?: string }) {
  return (
    <div className="bg-primary rounded-b-[28px] px-5 pt-9 pb-6">
      <Image src="/images/subup-logo.png" alt="" width={86} height={18} className="h-[18px] w-auto" />
      {title ? <p className="m-0 mt-4 text-lg font-extrabold tracking-tight text-white">{title}</p> : null}
    </div>
  );
}

function HomeFrame() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex flex-col gap-4 px-4 pt-5">
        <p className="text-foreground m-0 text-sm font-extrabold">Upcoming Games</p>
        <div className="border-border flex flex-col gap-2 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-primary text-xs font-bold">Wed 7:30pm</span>
            <span className="bg-secondary text-primary rounded-full px-2 py-0.5 text-[11px] font-bold">8 of 10 in</span>
          </div>
          <p className="text-foreground m-0 text-sm font-extrabold">Woolston 5-a-side</p>
          <p className="text-muted-foreground m-0 text-xs">Soccer Dome · £4.50 a head</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <CheckIcon className="size-3.5" aria-hidden /> You’ve paid
          </div>
        </div>
        <p className="text-foreground m-0 text-sm font-extrabold">Your groups</p>
        <div className="border-border flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
          <div>
            <p className="text-foreground m-0 text-sm font-extrabold">Woolston 7:30pm Football</p>
            <p className="text-muted-foreground m-0 text-xs">14 members</p>
          </div>
          <MmrPill>1,240 MMR</MmrPill>
        </div>
      </div>
    </div>
  );
}

const players = [
  { name: "Sam", mmr: "1,310", paid: true },
  { name: "Priya", mmr: "1,255", paid: true },
  { name: "Tom", mmr: "1,198", paid: true },
  { name: "Jess", mmr: "1,172", paid: false },
  { name: "Dan", mmr: "1,240", paid: true },
];

function LobbyFrame() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Woolston 5-a-side" />
      <div className="flex flex-col gap-3 px-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-foreground m-0 text-sm font-extrabold">Players</p>
          <span className="text-muted-foreground text-xs font-bold">8 of 10</span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {players.map((player) => (
            <li key={player.name} className="border-border flex items-center gap-3 rounded-2xl border bg-white px-3 py-2.5">
              <span className="bg-secondary text-primary flex size-8 items-center justify-center rounded-full text-xs font-extrabold">
                {player.name[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-foreground block text-sm font-bold">{player.name}</span>
                <span className="text-muted-foreground block text-[11px]">{player.mmr} MMR</span>
              </span>
              {player.paid ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  <CheckIcon className="size-3" aria-hidden /> Paid
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                  <ClockIcon className="size-3" aria-hidden /> Unpaid
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResultFrame() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Full time" />
      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="border-border flex items-center justify-around rounded-2xl border bg-white py-5 shadow-sm">
          <div className="text-center">
            <p className="text-muted-foreground m-0 text-xs font-bold">Blue</p>
            <p className="text-primary m-0 text-4xl font-extrabold">6</p>
          </div>
          <span className="text-muted-foreground text-lg font-bold">–</span>
          <div className="text-center">
            <p className="text-muted-foreground m-0 text-xs font-bold">Red</p>
            <p className="text-foreground m-0 text-4xl font-extrabold">4</p>
          </div>
        </div>
        <div className="border-border flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm">
          <span className="bg-gold text-primary flex size-10 items-center justify-center rounded-full">
            <TrophyIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground m-0 text-[11px] font-bold tracking-wider uppercase">Man of the Match</p>
            <p className="text-foreground m-0 text-sm font-extrabold">Sam</p>
          </div>
          <span className="text-xs font-extrabold text-emerald-700">+22</span>
        </div>
        <div className="border-border flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
          <span className="text-foreground text-sm font-bold">Your rating</span>
          <MmrPill>1,240 MMR</MmrPill>
        </div>
      </div>
    </div>
  );
}

function InviteFrame() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Invites" />
      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="border-border flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-full text-sm font-extrabold">
              S
            </span>
            <div className="min-w-0">
              <p className="text-foreground m-0 text-sm font-extrabold">Sam invited you</p>
              <p className="text-muted-foreground m-0 text-xs">Woolston 7:30pm Football</p>
            </div>
          </div>
          <p className="text-muted-foreground m-0 text-xs leading-relaxed">
            14 members · Wednesdays · Private group
          </p>
          <div className="grid grid-cols-2 gap-2">
            <span className="bg-primary rounded-xl py-2.5 text-center text-xs font-extrabold text-white">Join</span>
            <span className="border-border text-foreground rounded-xl border py-2.5 text-center text-xs font-bold">
              Not now
            </span>
          </div>
        </div>
        <div className="border-border flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm opacity-70">
          <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-full text-sm font-extrabold">
            P
          </span>
          <div className="min-w-0">
            <p className="text-foreground m-0 text-sm font-extrabold">Priya invited you</p>
            <p className="text-muted-foreground m-0 text-xs">Sunday 5-a-side</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const frameMap = {
  invite: { Frame: InviteFrame, label: "Group invite with a Join button" },
  home: { Frame: HomeFrame, label: "SubUp home screen with an upcoming game" },
  lobby: { Frame: LobbyFrame, label: "Game lobby showing who has paid" },
  result: { Frame: ResultFrame, label: "Final score with Man of the Match" },
} as const;

export type PhoneFrameName = keyof typeof frameMap;

export function PhoneMockup({
  frame,
  className,
}: {
  frame: PhoneFrameName;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { Frame, label } = frameMap[frame];

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "border-night bg-night relative h-[540px] w-[264px] shrink-0 overflow-hidden rounded-[44px] border-[9px] shadow-[0px_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/15 sm:h-[600px] sm:w-[294px] sm:rounded-[50px]",
        className,
      )}
    >
      <div className="bg-background relative h-full overflow-hidden rounded-[35px] sm:rounded-[41px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={frame}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
            aria-hidden
          >
            <Frame />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="bg-night absolute top-0 left-1/2 h-5 w-24 -translate-x-1/2 rounded-b-2xl" />
    </div>
  );
}
