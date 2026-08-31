export const CONSENT_KEY = "subup-consent";

export type ConsentValue = "accepted" | "rejected";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_KEY, value);
}
