import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SkipLink } from "@/components/skip-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConsentManager } from "@/components/consent-manager";
import { JsonLd } from "@/components/json-ld";
import { publicEnv } from "@/lib/public-env";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const metadataBase = new URL(publicEnv.siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} — Sub In. Level Up.`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.company }],
  creator: site.company,
  publisher: site.company,
  keywords: [
    "SubUp",
    "private sports groups",
    "5-a-side",
    "football",
    "UK",
    "pay to play",
    "Man of the Match",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} — Sub In. Level Up.`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sub In. Level Up.`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    ...(publicEnv.appStoreId
      ? { "apple-itunes-app": `app-id=${publicEnv.appStoreId}` }
      : {}),
    ...(publicEnv.metaDomainVerify
      ? { "facebook-domain-verification": publicEnv.metaDomainVerify }
      : {}),
  },
};

const consentDefaults = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={manrope.variable}>
      <body className={`${manrope.className} min-h-screen antialiased`}>
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: consentDefaults }}
        />
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentManager
          ids={{
            gaMeasurementId: publicEnv.gaMeasurementId,
            googleAdsId: publicEnv.googleAdsId,
            metaPixelId: publicEnv.metaPixelId,
            tiktokPixelId: publicEnv.tiktokPixelId,
          }}
        />
        <JsonLd />
      </body>
    </html>
  );
}
