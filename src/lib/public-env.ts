function read(key: string) {
  return process.env[key]?.trim() ?? "";
}

export const publicEnv = {
  siteUrl: read("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",
  gaMeasurementId: read("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  googleAdsId: read("NEXT_PUBLIC_GOOGLE_ADS_ID"),
  metaPixelId: read("NEXT_PUBLIC_META_PIXEL_ID"),
  metaDomainVerify: read("NEXT_PUBLIC_META_DOMAIN_VERIFY"),
  tiktokPixelId: read("NEXT_PUBLIC_TIKTOK_PIXEL_ID"),
  appStoreUrl: read("NEXT_PUBLIC_APP_STORE_URL"),
  playStoreUrl: read("NEXT_PUBLIC_PLAY_STORE_URL"),
  appStoreId: read("NEXT_PUBLIC_APP_STORE_ID"),
};
