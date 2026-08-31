import { PhoneMockup } from "@/components/phone-mockup";
import { StoreButtons } from "@/components/store-buttons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,36,136,0.06),transparent_55%)]" />
      <div className="bg-cyan/10 pointer-events-none absolute -top-[20%] -left-[10%] h-[40%] w-[50%] rounded-full blur-[80px]" />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 lg:flex-row lg:gap-20">
        <div className="flex max-w-xl flex-col items-start gap-8 lg:max-w-none lg:flex-1">
          <div className="border-cyan/20 bg-cyan/10 inline-flex items-center gap-3 rounded-full border px-4 py-2">
            <span className="bg-cyan size-2 rounded-full" />
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              {site.kicker}
            </span>
          </div>
          <h1 className="text-primary m-0 text-[clamp(56px,10vw,128px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            {site.headline}
            <br />
            <span className="text-cyan">{site.headlineAccent}</span>
          </h1>
          <p className="text-muted-foreground m-0 max-w-lg text-lg leading-8 sm:text-xl">
            {site.heroBody}
          </p>
          <div id="download" className="pt-2">
            <StoreButtons />
          </div>
        </div>
        <div className="flex justify-center lg:flex-1 lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
