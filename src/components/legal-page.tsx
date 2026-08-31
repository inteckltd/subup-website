import { NavyShell } from "@/components/navy-shell";

export function LegalPage({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <NavyShell>
        <div className="mx-auto w-full max-w-3xl px-6 pt-10 pb-12">
          <p className="text-cyan mb-3 text-xs font-bold tracking-[0.12em] uppercase">
            {kicker}
          </p>
          <h1 className="mb-3 text-[clamp(28px,5vw,40px)] leading-[1.15] font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="m-0 max-w-xl text-[rgba(254,254,253,0.82)]">{intro}</p>
        </div>
      </NavyShell>
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-14">
        <article className="bg-card rounded-card ring-border px-6 py-8 shadow-sm ring-1 sm:px-8 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:first:mt-0 [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-extrabold [&_p]:mb-3.5 [&_ul]:mb-3.5 [&_ul]:list-disc [&_ul]:pl-5 [&_li+li]:mt-1.5">
          {children}
        </article>
      </main>
    </>
  );
}
