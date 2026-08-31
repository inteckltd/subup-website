export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "",
  metaDomainVerify: process.env.NEXT_PUBLIC_META_DOMAIN_VERIFY?.trim() ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim() ?? "",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "",
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "",
  appStoreId: process.env.NEXT_PUBLIC_APP_STORE_ID?.trim() ?? "",
};
