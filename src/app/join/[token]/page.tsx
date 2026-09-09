import type { Metadata } from "next";
import { StoreButtons } from "@/components/store-buttons";
import { NavyShell } from "@/components/navy-shell";
import { site } from "@/lib/site";

type JoinPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "You're invited",
  description: `You've been invited to a group on ${site.name}. Open the app to join, or download SubUp first.`,
  robots: { index: false, follow: false },
};

export default async function JoinPage({ params }: JoinPageProps) {
  const { token } = await params;
  const openInAppHref = `subup://join/${encodeURIComponent(token)}`;

  return (
    <>
      <NavyShell>
        <div className="mx-auto w-full max-w-3xl px-6 pt-10 pb-12">
          <p className="text-cyan mb-3 text-xs font-bold tracking-[0.12em] uppercase">Invite</p>
          <h1 className="mb-3 text-[clamp(28px,5vw,40px)] leading-[1.15] font-extrabold tracking-tight">
            You&apos;re invited to a group on SubUp
          </h1>
          <p className="m-0 max-w-xl text-[rgba(254,254,253,0.82)]">
            Open the app to join this squad. If you don&apos;t have SubUp yet, download it first, then tap the link
            again.
          </p>
        </div>
      </NavyShell>
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-14">
        <article className="bg-card rounded-card ring-border flex flex-col gap-8 px-6 py-8 shadow-sm ring-1 sm:px-8">
          <a
            href={openInAppHref}
            className="bg-primary inline-flex items-center justify-center rounded-2xl px-6 py-4 text-center text-sm font-bold tracking-[0.08em] text-white uppercase no-underline"
          >
            Open in SubUp
          </a>
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground m-0 text-sm font-bold tracking-[0.08em] uppercase">
              Don&apos;t have the app?
            </p>
            <StoreButtons />
          </div>
        </article>
      </main>
    </>
  );
}
