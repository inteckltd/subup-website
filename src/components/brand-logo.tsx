import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const RATIO = 991 / 212;

/**
 * Navy wordmark for cream surfaces (the cyan lockup is too weak on #FEFEFD),
 * cyan lockup for navy surfaces.
 */
export function BrandLogo({
  className,
  height = 32,
  tone = "navy",
  href = "/",
}: {
  className?: string;
  height?: number;
  tone?: "navy" | "cyan";
  href?: string | null;
}) {
  const width = Math.round(height * RATIO);

  const mark =
    tone === "navy" ? (
      <span
        role="img"
        aria-label="SubUp"
        className="bg-primary block"
        style={{
          width,
          height,
          maskImage: "url(/images/subup-logo.png)",
          WebkitMaskImage: "url(/images/subup-logo.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
        }}
      />
    ) : (
      <Image
        src="/images/subup-logo.png"
        alt="SubUp"
        height={height}
        width={width}
        style={{ height, width: "auto" }}
        priority
      />
    );

  if (href === null) return <span className={cn("inline-flex items-center", className)}>{mark}</span>;

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center no-underline", className)}
      aria-label="SubUp home"
    >
      {mark}
    </Link>
  );
}
