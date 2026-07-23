import { Author, Category } from "./types";

export const SITE = {
  name: "Nest & Nurture",
  tagline: "A calmer way to raise a family",
  description:
    "Nest & Nurture is a premium motherhood and parenting publication covering pregnancy, newborn life, raising kids, and caring for yourself along the way — thoughtful, evidence-informed, and beautifully unhurried.",
  url: "https://www.nestandnurture.com",
  ogImage: "/images/og-default.jpg",
  twitter: "@nestandnurture",
  locale: "en_US",
  postsPerPage: 12,
};

// Categories are the primary taxonomy. Adding a new one here automatically
// creates its listing page, nav entry, and post-card badge — no template
// changes required as the catalog grows into the thousands.
export const CATEGORIES: Category[] = [
  {
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Everyday living, wellness, and the small routines that make family life feel good.",
    color: "brown",
  },
  {
    slug: "pregnancy",
    name: "Pregnancy",
    description: "Trimester guides, birth prep, and honest reflections on the road to motherhood.",
    color: "rose",
  },
  {
    slug: "newborn",
    name: "Newborn",
    description: "Sleep, feeding, and the tender, disorienting first months.",
    color: "sage",
  },
  {
    slug: "toddler-kids",
    name: "Toddler & Kids",
    description: "Behavior, milestones, and everyday parenting through the growing years.",
    color: "beige",
  },
  {
    slug: "motherhood",
    name: "Motherhood",
    description: "Identity, partnership, and the emotional landscape of raising a family.",
    color: "brown",
  },
  {
    slug: "self-care",
    name: "Self-Care",
    description: "Rest, boundaries, and looking after the person doing the raising.",
    color: "rose",
  },
  {
    slug: "home-family",
    name: "Home & Family",
    description: "Rituals, recipes, and calm, family-centered spaces.",
    color: "sage",
  },
];

export const AUTHORS: Author[] = [
  {
    name: "Claire Whitfield",
    slug: "claire-whitfield",
    role: "Founding Editor",
    avatar: "/images/authors/Claire Whitfield.jpg",
    bio: "Claire founded Nest & Nurture after her first pregnancy left her craving parenting writing that felt like a trusted friend rather than a warning label. She writes on newborn life and the emotional side of motherhood.",
  },
  {
    name: "Dr. Amara Osei",
    slug: "amara-osei",
    role: "Medical Reviewer, Pediatrics",
    avatar: "/images/authors/Amara Osei.jpg",
    bio: "Amara is a board-certified pediatrician who reviews Nest & Nurture's health and development content for accuracy and reviews clinical claims before publication.",
  },
  {
    name: "Priya Anand",
    slug: "priya-anand",
    role: "Contributing Writer",
    avatar: "/images/authors/Priya Anand.jpg",
    bio: "Priya writes on toddlerhood, sibling dynamics, and building calm rhythms at home. She lives outside Portland with her two children.",
  },
];

export const NAV_LINKS = [
  { label: "Lifestyle", href: "/blog/category/lifestyle" },
  { label: "Pregnancy", href: "/blog/category/pregnancy" },
  { label: "Newborn", href: "/blog/category/newborn" },
  { label: "Toddler & Kids", href: "/blog/category/toddler-kids" },
  { label: "Motherhood", href: "/blog/category/motherhood" },
  { label: "Self-Care", href: "/blog/category/self-care" },
  { label: "About", href: "/about" },
];

export const FOOTER_LINKS = {
  read: NAV_LINKS.slice(0, 6),
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ],
};

export function getAuthorBySlug(slug: string): Author {
  return (
    AUTHORS.find((a) => a.slug === slug) ?? {
      name: "Nest & Nurture Editors",
      slug: "editors",
      role: "Editorial Team",
      avatar: "/images/authors/claire-whitfield.svg",
      bio: "Written by the Nest & Nurture editorial team.",
    }
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
