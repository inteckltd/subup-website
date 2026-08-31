export function grantGoogleConsent() {
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

export function denyGoogleConsent() {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function trackLead() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead");
  window.fbq?.("track", "Lead");
  window.fbq?.("track", "Contact");
  window.ttq?.track("SubmitForm");
}

export function trackDownload(store: "ios" | "android") {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "download_click", { store });
  window.fbq?.("trackCustom", "DownloadClick", { store });
  window.ttq?.track("ClickButton", { contents: [{ content_id: store }] });
}
