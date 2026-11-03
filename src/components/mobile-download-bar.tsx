"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StoreButtons } from "@/components/store-buttons";

/** Slim bar on small screens, shown once the hero has scrolled away. */
export function MobileDownloadBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (pathname !== "/") return;
    const hero = document.getElementById("download");
    const closer = document.getElementById("get-the-app");
    if (!hero) return;
    let heroGone = false;
    let closerOn = false;
    const update = () => setVisible(heroGone && !closerOn);
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroGone = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    heroObserver.observe(hero);
    const closerObserver = new IntersectionObserver(([entry]) => {
      closerOn = entry.isIntersecting;
      update();
    });
    if (closer) closerObserver.observe(closer);
    return () => {
      heroObserver.disconnect();
      closerObserver.disconnect();
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduce ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        >
          <StoreButtons variant="compact" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
