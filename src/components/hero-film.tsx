"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { PlayIcon, XIcon } from "lucide-react";

type HeroFilmProps = {
  posterSrc: string;
  /** Null until the film file is added to public/video. */
  videoSrc: string | null;
};

export function HeroFilm({ posterSrc, videoSrc }: HeroFilmProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Play the SubUp film"
        className="group flex w-full max-w-md items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-3 pr-5 text-left backdrop-blur-md transition-colors duration-200 outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <span className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={posterSrc}
            alt=""
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="bg-night/40 absolute inset-0" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex size-11 items-center justify-center">
              <span className="subup-ring bg-cyan absolute inset-0 rounded-full [animation:subup-ring_2.6s_ease-out_infinite]" />
              <span className="bg-cyan text-night relative flex size-full items-center justify-center rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                <PlayIcon className="ml-0.5 size-5 fill-current" aria-hidden />
              </span>
            </span>
          </span>
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-cyan text-xs font-bold tracking-[0.14em] uppercase">Meet SubUp</span>
          <span className="text-base font-extrabold text-white">Watch the film</span>
          <span className="text-sm text-white/65">See how a game comes together.</span>
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-8">
          <Dialog.Title className="sr-only">SubUp film</Dialog.Title>
          <Dialog.Description className="sr-only">
            A short animated film about SubUp.
          </Dialog.Description>
          <div className="pointer-events-none relative flex max-h-full w-full max-w-5xl items-center justify-center">
            {videoSrc ? (
              <video
                src={videoSrc}
                poster={posterSrc}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="pointer-events-auto max-h-[calc(100dvh-5.5rem)] w-auto max-w-full rounded-2xl bg-black shadow-2xl"
              />
            ) : (
              <div className="bg-primary pointer-events-auto flex aspect-video w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl px-8 text-center text-white">
                <p className="m-0 text-2xl font-extrabold tracking-tight">The film is on its way</p>
                <p className="m-0 text-white/75">Check back soon, or download the app to see SubUp for yourself.</p>
              </div>
            )}
          </div>
          <Dialog.Close
            aria-label="Close film"
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:top-6 sm:right-6"
          >
            <XIcon className="size-6" aria-hidden />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
