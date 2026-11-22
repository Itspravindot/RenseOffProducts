/**
 * Central site configuration.
 *
 * WhatsApp: +91 93214 41464. Store digits only, including country code
 * (no + or spaces); `whatsappDisplay` is the human-readable version.
 */
export const siteConfig = {
  name: "Renseoff",
  tagline: "A Cleaner Home. A Better Everyday.",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919321441464",
  whatsappDisplay: "+91 93214 41464",
  email: "renseoff@gmail.com",
  instagram: "https://www.instagram.com/renseoff",
  description:
    "Renseoff makes thoughtfully crafted essentials for every corner of your home.",
} as const;

/** Brand story content supplied by Renseoff, kept in one place for reuse. */
export const brandInfo = {
  aboutHeading: "Premium Cleaning. Inspired by Nature. Built on Trust.",
  about:
    "Renseoff is an Indian cleaning solutions brand committed to premium quality, innovation, and excellence for modern homes and businesses. Our range includes dishwash, handwash, floor cleaner, toilet cleaner, laundry detergent, air freshener, and more. We focus on plant-based ingredients, thoughtful formulations, and continuous innovation to deliver quality cleaning solutions.",
  tagline: "Renseoff — Redefining Clean. Building Trust.",
  whyHeading: "Why We Started",
  why:
    "Founded with a vision to build a distinguished Indian brand, Renseoff strives to elevate everyday cleaning through premium quality, innovation, and customer trust.",
  whyTagline: "Renseoff — A Vision Built on Excellence.",
  missionHeading: "Our Mission & Vision",
  mission:
    "Our mission is to deliver reliable, affordable cleaning solutions with consistent quality and customer care. Our vision is to build a trusted Indian brand that makes everyday cleaning better through innovation, responsible product development, and thoughtful use of plant-based ingredients.",
  stats: [
    { value: "5000+", label: "Happy Customers" },
    { value: "100+", label: "Wholesalers" },
    { value: "300+", label: "Restaurants" },
  ],
  founder: {
    name: "Mohmmad Ali",
    role: "Founder & CEO",
  },
  bulkNote: "",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Our Story", href: "#our-story" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const faqs = [
  {
    question: "What sizes are available?",
    answer:
      "Our core products are available in 500ML and 5L. Air fresheners are only available in 200ML.",
  },
  {
    question: "How can I place an order?",
    answer: `You can place an order through WhatsApp or by calling us on ${siteConfig.whatsappDisplay}.`,
  },
  {
    question: "Do you offer bulk orders?",
    answer: "Yes, we do offer bulk orders. We also provide 50L cans for bulk requirements.",
  },
  {
    question: "Where does Renseoff deliver?",
    answer: "We deliver pan India.",
  },
  {
    question: "How can I contact customer support?",
    answer: `You can mail us at ${siteConfig.email} or message us on WhatsApp.`,
  },
] as const;
