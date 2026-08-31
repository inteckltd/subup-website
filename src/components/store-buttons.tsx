"use client";

import Image from "next/image";
import { publicEnv } from "@/lib/public-env";
import { trackDownload } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "hero" | "cta";

type StoreButtonsProps = {
  className?: string;
  variant?: Variant;
};

function StoreLink({
  href,
  store,
  label,
  comingSoon,
  className,
  children,
}: {
  href: string;
  store: "ios" | "android";
  label: string;
  comingSoon: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (comingSoon) {
    return (
      <span className={cn(className, "cursor-not-allowed opacity-55")} aria-disabled="true">
        {children}
        <span className="sr-only">{label} — coming soon</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload(store)}
    >
      {children}
    </a>
  );
}

function AppleGlyph({ src }: { src: string }) {
  return (
    <span className="relative block h-6 w-[18px] overflow-hidden">
      <Image src={src} alt="" width={18} height={24} unoptimized className="size-full object-contain" />
    </span>
  );
}

function PlayGlyph() {
  return (
    <span className="relative block size-5 overflow-hidden">
      <Image
        src="/icons/google-play.svg"
        alt=""
        width={20}
        height={20}
        unoptimized
        className="size-full object-contain"
      />
    </span>
  );
}

export function StoreButtons({ className, variant = "hero" }: StoreButtonsProps) {
  const iosReady = Boolean(publicEnv.appStoreUrl);
  const androidReady = Boolean(publicEnv.playStoreUrl);

  if (variant === "cta") {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        <StoreLink
          href={publicEnv.appStoreUrl}
          store="ios"
          label="Download on the App Store"
          comingSoon={!iosReady}
          className="inline-flex items-center gap-4 rounded-2xl bg-white px-10 py-5 no-underline"
        >
          <AppleGlyph src="/icons/apple-navy.svg" />
          <span className="text-primary text-sm font-bold tracking-[0.14em] uppercase">
            App Store
          </span>
        </StoreLink>
        <StoreLink
          href={publicEnv.playStoreUrl}
          store="android"
          label="Get it on Google Play"
          comingSoon={!androidReady}
          className="inline-flex items-center gap-4 rounded-2xl bg-cyan px-10 py-5 no-underline"
        >
          <PlayGlyph />
          <span className="text-primary text-sm font-bold tracking-[0.14em] uppercase">
            Google Play
          </span>
        </StoreLink>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <StoreLink
        href={publicEnv.appStoreUrl}
        store="ios"
        label="Download on the App Store"
        comingSoon={!iosReady}
        className="border-primary bg-primary inline-flex items-center gap-3 rounded-2xl border px-7 py-4 text-white no-underline"
      >
        <AppleGlyph src="/icons/apple.svg" />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold tracking-wide uppercase opacity-60">
            Download on
          </span>
          <span className="text-lg font-bold">App Store</span>
        </span>
      </StoreLink>
      <StoreLink
        href={publicEnv.playStoreUrl}
        store="android"
        label="Get it on Google Play"
        comingSoon={!androidReady}
        className="border-border inline-flex items-center gap-3 rounded-2xl border bg-white px-7 py-4 no-underline"
      >
        <PlayGlyph />
        <span className="flex flex-col items-start leading-none">
          <span className="text-foreground text-[10px] font-bold tracking-wide uppercase opacity-60">
            Get it on
          </span>
          <span className="text-foreground text-lg font-bold">Google Play</span>
        </span>
      </StoreLink>
    </div>
  );
}
