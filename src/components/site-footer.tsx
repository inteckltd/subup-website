import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t px-5 pt-10 pb-28 sm:px-6 sm:pb-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <BrandLogo height={30} />
          <nav
            aria-label="Legal"
            className="text-muted-foreground flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold tracking-[0.1em] uppercase"
          >
            <Link href="/terms" className="hover:text-primary text-muted-foreground no-underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary text-muted-foreground no-underline">
              Privacy
            </Link>
            <Link href="/delete" className="hover:text-primary text-muted-foreground no-underline">
              Delete account
            </Link>
            <Link href="/#contact" className="hover:text-primary text-muted-foreground no-underline">
              Support
            </Link>
          </nav>
        </div>
        <p className="text-muted-foreground m-0 max-w-2xl text-xs leading-relaxed">
          {site.name} is operated by {site.company} (company number {site.companyNumber}). {site.address}
        </p>
      </div>
    </footer>
  );
}
