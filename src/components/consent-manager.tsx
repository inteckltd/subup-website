"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  denyGoogleConsent,
  ensureGtag,
  grantGoogleConsent,
} from "@/lib/analytics";
import { getStoredConsent, setStoredConsent, type ConsentValue } from "@/lib/consent";
import Link from "next/link";

export type PixelIds = {
  gaMeasurementId: string;
  googleAdsId: string;
  metaPixelId: string;
  tiktokPixelId: string;
};

function loadGoogle(id: string, adsId: string) {
  ensureGtag();
  window.gtag?.("js", new Date());
  window.gtag?.("config", id, { send_page_view: true });
  if (adsId) {
    window.gtag?.("config", adsId);
  }

  if (document.getElementById("ga-gtag")) return;
  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function loadMeta(id: string) {
  if (document.getElementById("meta-pixel")) return;

  type FbqFn = NonNullable<Window["fbq"]> & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    loaded?: boolean;
    version?: string;
    push?: unknown;
  };

  const fbq: FbqFn = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;

  const script = document.createElement("script");
  script.id = "meta-pixel";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function loadTikTok(id: string) {
  if (document.getElementById("tiktok-pixel")) return;
  const script = document.createElement("script");
  script.id = "tiktok-pixel";
  script.text = `!function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
    ttq.setAndDefer=function(obj,method){obj[method]=function(){obj.push([method].concat(Array.prototype.slice.call(arguments,0)))}};
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance=function(sid){var inst=ttq._i[sid]||[];for(var n=0;n<ttq.methods.length;n++)ttq.setAndDefer(inst,ttq.methods[n]);return inst};
    ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load(${JSON.stringify(id)});
    ttq.page();
  }(window, document, 'ttq');`;
  document.head.appendChild(script);
}

function enablePixels(ids: PixelIds) {
  grantGoogleConsent();
  if (ids.gaMeasurementId) loadGoogle(ids.gaMeasurementId, ids.googleAdsId);
  if (ids.metaPixelId) loadMeta(ids.metaPixelId);
  if (ids.tiktokPixelId) loadTikTok(ids.tiktokPixelId);
}

export function ConsentManager({ ids }: { ids: PixelIds }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);
  const firstView = useRef(true);

  useEffect(() => {
    const stored = getStoredConsent();
    setChoice(stored);
    setReady(true);
    if (stored === "accepted") {
      enablePixels(ids);
    }
    // Pixel IDs are build-time env constants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const showBanner = ready && !choice;
    document.body.style.overflow = showBanner ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready, choice]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.fbq?.("track", "PageView");
    window.ttq?.page();
  }, [pathname, ready, choice]);

  function accept() {
    setStoredConsent("accepted");
    setChoice("accepted");
    enablePixels(ids);
  }

  function reject() {
    setStoredConsent("rejected");
    setChoice("rejected");
    denyGoogleConsent();
  }

  if (!ready || choice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-[#010101]/50 backdrop-blur-[2px]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="bg-card rounded-card ring-border relative z-10 w-full max-w-lg p-6 shadow-lg ring-1 sm:p-8"
      >
        <h2 id="cookie-consent-title" className="text-primary mb-3 text-lg font-extrabold tracking-tight">
          Cookies
        </h2>
        <p className="mb-6 text-sm">
          We use analytics and advertising cookies (Google, Meta, TikTok) only if you
          accept. See the{" "}
          <Link href="/privacy" className="font-bold">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-2xl font-bold"
            onClick={reject}
          >
            Reject
          </Button>
          <Button
            type="button"
            className="h-11 rounded-2xl font-bold hover:bg-navy-hover"
            onClick={accept}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
