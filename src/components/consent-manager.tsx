"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  denyGoogleConsent,
  grantGoogleConsent,
} from "@/lib/analytics";
import { getStoredConsent, setStoredConsent, type ConsentValue } from "@/lib/consent";
import { publicEnv } from "@/lib/public-env";
import Link from "next/link";

function loadGoogle(id: string) {
  if (document.getElementById("ga-gtag")) return;
  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag?.("js", new Date());
  window.gtag?.("config", id);
  if (publicEnv.googleAdsId) {
    window.gtag?.("config", publicEnv.googleAdsId);
  }
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

function enablePixels() {
  grantGoogleConsent();
  if (publicEnv.gaMeasurementId) loadGoogle(publicEnv.gaMeasurementId);
  if (publicEnv.metaPixelId) loadMeta(publicEnv.metaPixelId);
  if (publicEnv.tiktokPixelId) loadTikTok(publicEnv.tiktokPixelId);
}

export function ConsentManager() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);
  const firstView = useRef(true);

  useEffect(() => {
    const stored = getStoredConsent();
    setChoice(stored);
    setReady(true);
    if (stored === "accepted") {
      enablePixels();
    }
  }, []);

  useEffect(() => {
    const showBanner = ready && !choice;
    document.body.style.paddingBottom = showBanner ? "8rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [ready, choice]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
    window.ttq?.page();
  }, [pathname, ready, choice]);

  function accept() {
    setStoredConsent("accepted");
    setChoice("accepted");
    enablePixels();
  }

  function reject() {
    setStoredConsent("rejected");
    setChoice("rejected");
    denyGoogleConsent();
  }

  if (!ready || choice) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="bg-card rounded-card ring-border mx-auto flex max-w-3xl flex-col gap-4 p-5 shadow-lg ring-1 sm:flex-row sm:items-center">
        <p className="m-0 flex-1 text-sm">
          We use analytics and advertising cookies (Google, Meta, TikTok) only if you
          accept. See the{" "}
          <Link href="/privacy" className="font-bold">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-2xl font-bold"
            onClick={reject}
          >
            Reject
          </Button>
          <Button
            type="button"
            className="h-10 rounded-2xl font-bold hover:bg-navy-hover"
            onClick={accept}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
