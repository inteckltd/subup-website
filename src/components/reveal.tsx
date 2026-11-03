"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onLoad?: boolean;
  as?: "div" | "li" | "article" | "section";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, onLoad = false, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const target = { opacity: 1, y: 0 };
  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      {...(onLoad
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "0px 0px -80px 0px" } })}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Component>
  );
}
