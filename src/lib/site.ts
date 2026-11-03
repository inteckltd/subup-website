export const site = {
  name: "SubUp",
  headline: "Organise the kickabout.",
  headlineAccent: "Collect the cash.",
  metaTitle: "Organise the kickabout. Collect the cash.",
  tagline: "Organise the kickabout, collect the cash, track the games, climb the ratings.",
  description:
    "SubUp is a UK app for private sports groups. Invite your mates, pay to take your spot, track the games, and climb the ratings, without WhatsApp chaos.",
  heroBody:
    "Private groups for football, rugby, padel, basketball and more. Everyone who plays has paid, and the history stays with the group.",
  kicker: "Private groups · UK",
  company: "Inteck Ltd",
  companyNumber: "12246244",
  address:
    "Unit B, Focal Point, Second Avenue, Trafford Park, Manchester, M17 1FG, United Kingdom",
  email: "info@inteckltd.co.uk",
  phone: "0800 368 5220",
  phoneHref: "tel:08003685220",
  supportSla: "We aim to reply within two working days.",
} as const;

export const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#contact", label: "Support" },
] as const;

export const filmPaths = {
  video: "/video/subup-walkthrough-1080p-ben-vo-v5.mp4",
  poster: "/video/subup-poster.jpg",
  fallbackPoster: "/images/auth-hero.jpg",
} as const;
