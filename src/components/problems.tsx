import { CalendarCheckIcon, HistoryIcon, WalletIcon, UsersIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";

const problems = [
  { icon: UsersIcon, title: "Who’s in?", body: "A lobby with a max, a min and a waitlist, not a thread of “I’m in, maybe”." },
  { icon: WalletIcon, title: "Who’s paid?", body: "Pay your spot with Apple Pay, Google Pay or card. No pay, no place." },
  { icon: CalendarCheckIcon, title: "No ghost games", body: "Too few players 24 hours out and the game cancels, with card payments refunded." },
  { icon: HistoryIcon, title: "The history stays", body: "Scores, Man of the Match and ratings stay with the group." },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="bg-night px-5 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 id="problems-title" className="sr-only">
          What SubUp fixes
        </h2>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.07}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition-colors duration-200 hover:bg-white/10"
            >
              <span className="bg-cyan text-night flex size-10 items-center justify-center rounded-xl">
                <item.icon className="size-5" aria-hidden />
              </span>
              <p className="m-0 text-lg font-extrabold tracking-tight text-white">{item.title}</p>
              <p className="m-0 text-sm leading-relaxed text-white/65">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
