"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
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

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-5 lg:px-8">
        <BrandLogo height={32} />
        <nav className="hidden items-center md:flex" aria-label="Site">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary px-5 text-sm font-bold tracking-[0.14em] uppercase no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className={cn(
              buttonVariants(),
              "ml-5 h-11 rounded-2xl px-8 text-[11px] font-bold tracking-[0.11em] uppercase no-underline shadow-[0px_10px_15px_-3px_rgba(3,36,136,0.1)]",
            )}
          >
            Get the app
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="text-primary inline-flex size-10 items-center justify-center rounded-2xl md:hidden">
            <MenuIcon className="size-6" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card p-6">
            <SheetHeader className="px-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <BrandLogo height={28} />
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5 text-sm font-bold tracking-[0.14em] uppercase">
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
                className={cn(
                  buttonVariants(),
                  "mt-2 h-11 rounded-2xl px-4 text-[11px] font-bold tracking-[0.11em] uppercase no-underline",
                )}
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
