export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    ttq?: {
      page: () => void;
      track: (event: string, payload?: Record<string, unknown>) => void;
      load: (id: string) => void;
    };
  }
}
