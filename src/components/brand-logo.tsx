import Image from "next/image";
import Link from "next/link";

export function BrandLogo({
  className,
  height = 32,
}: {
  className?: string;
  height?: number;
}) {
  const width = Math.round(height * (991 / 212));

  return (
    <Link
      href="/"
      className={`inline-flex items-center no-underline ${className ?? ""}`}
      aria-label="SubUp home"
    >
      <Image
        src="/images/subup-logo.png"
        alt="SubUp"
        height={height}
        width={width}
        className="h-8 w-auto"
        style={{ height, width: "auto" }}
        priority
      />
    </Link>
  );
}
