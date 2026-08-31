import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t px-6 pt-16 pb-20 lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <BrandLogo height={36} />
          <nav className="text-muted-foreground flex flex-wrap gap-x-10 gap-y-3 text-sm font-bold tracking-[0.14em] uppercase">
            <Link href="/terms" className="hover:text-primary no-underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary no-underline">
              Privacy
            </Link>
            <Link href="/delete" className="hover:text-primary no-underline">
              Delete account
            </Link>
            <Link href="/#contact" className="hover:text-primary no-underline">
              Support
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-10">
          <p className="text-primary/5 m-0 text-center text-[clamp(80px,18vw,320px)] leading-none font-extrabold tracking-[-0.06em] italic uppercase">
            SUBUP
          </p>
          <p className="text-muted-foreground m-0 max-w-2xl text-center text-xs tracking-[0.2em] uppercase">
            {site.name} is operated by {site.company} (company number {site.companyNumber}).{" "}
            {site.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
