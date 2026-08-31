import Image from "next/image";
import { StoreButtons } from "@/components/store-buttons";

export function DownloadCta() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-20">
      <div className="bg-primary relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[48px] px-8 py-16 sm:rounded-[64px] sm:px-16 sm:py-24">
        <p className="pointer-events-none absolute -top-10 -right-10 rotate-12 text-[min(40vw,400px)] leading-none font-extrabold text-white/10 italic uppercase">
          SUBUP
        </p>
        <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col items-start gap-8">
            <h2 className="m-0 text-[clamp(48px,8vw,96px)] leading-[0.95] font-extrabold tracking-[-0.05em] text-white">
              Ready
              <br />
              to
              <br />
              sub in &
              <br />
              <span className="decoration-cyan italic underline decoration-4 underline-offset-8">
                win?
              </span>
            </h2>
            <p className="m-0 max-w-md text-xl font-bold text-white/80">
              Organise the football with your mates. Collect the cash, pick fair teams, and keep
              the history — all in one app.
            </p>
            <StoreButtons variant="cta" />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="border-foreground relative h-[480px] w-[240px] overflow-hidden rounded-[48px] border-[10px] bg-foreground p-2 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[580px] sm:w-[288px]">
              <div className="relative h-full overflow-hidden rounded-[36px]">
                <Image
                  src="/images/marketing/phone-dashboard.jpg"
                  alt="SubUp match history on a phone"
                  fill
                  className="object-cover object-[center_top]"
                  sizes="288px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
