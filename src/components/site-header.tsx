"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dark = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        dark
          ? scrolled
            ? "border-white/10 bg-night/85"
            : "border-transparent bg-night/40"
          : "border-border bg-background/85",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between h-16 gap-4 px-5 sm:px-6 lg:px-8">
        <BrandLogo height={28} tone={dark ? "cyan" : "navy"} />
        <nav className="hidden items-center md:flex" aria-label="Site">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 text-sm font-bold no-underline transition-colors",
                dark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className={cn(
              "ml-3 inline-flex h-10 items-center rounded-full px-6 text-sm font-extrabold no-underline transition-transform duration-150 active:scale-95",
              dark
                ? "bg-cyan text-night hover:bg-white hover:text-night"
                : "bg-primary hover:bg-navy-hover !text-white",
            )}
          >
            Get the app
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-2xl md:hidden",
              dark ? "text-white" : "text-primary",
            )}
          >
            <MenuIcon className="size-6" aria-hidden />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card p-6">
            <SheetHeader className="px-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <BrandLogo height={28} />
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5 text-base font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground no-underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#download"
                onClick={() => setOpen(false)}
                className="bg-primary mt-2 inline-flex h-12 items-center justify-center rounded-full px-4 text-sm font-extrabold !text-white no-underline"
              >
                Get the app
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
