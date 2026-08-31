import { publicEnv } from "@/lib/public-env";
import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.company,
        legalName: site.company,
        url: publicEnv.siteUrl,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit B, Focal Point, Second Avenue, Trafford Park",
          addressLocality: "Manchester",
          postalCode: "M17 1FG",
          addressCountry: "GB",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: site.name,
        applicationCategory: "SportsApplication",
        operatingSystem: "iOS, Android",
        description: site.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
        },
        url: publicEnv.siteUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
