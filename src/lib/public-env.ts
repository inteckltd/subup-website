import { APP_STORE_ID, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/store-urls";

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "",
  metaDomainVerify: process.env.NEXT_PUBLIC_META_DOMAIN_VERIFY?.trim() ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim() ?? "",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || APP_STORE_URL,
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() || PLAY_STORE_URL,
  appStoreId: process.env.NEXT_PUBLIC_APP_STORE_ID?.trim() || APP_STORE_ID,
};
