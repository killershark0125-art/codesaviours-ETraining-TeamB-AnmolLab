export type NavItem = {
  label: string;
  href: string;
};

export type Phone = {
  display: string;
  href: string;
};

const address = "Sultani Chowk, Gulshan Muhammad Abad, Faisalabad";

export const siteConfig = {
  name: "Anmol Health Care Lab",
  shortName: "Anmol Lab",
  tagline: "Precision in every test. Care in every patient.",
  description:
    "Search diagnostic tests, book a test and contact Anmol Health Care Lab in Faisalabad.",
  address,
  area: "Sultani Chowk",
  city: "Faisalabad",
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`,
  phones: [
    { display: "0316-6474766", href: "tel:+923166474766" },
    { display: "0321-6671476", href: "tel:+92321667476" },
  ] satisfies Phone[],
  email: "anmollaboratory@gmail.com",

  // Keep hidden until the client confirms the official WhatsApp number.
  whatsappNumber: null as string | null,

  routes: {
    home: "/",
    about: "/about",
    tests: "/tests",
    packages: "/packages",
    blog: "/blog",
    doctors: "/doctors",
    faq: "/faq",
    book: "/book",
    homeSampling: "/home-sampling",
    branches: "/branches",
    reports: "/reports",
    contact: "/contact",
    privacy: "/privacy",
    terms: "/terms",
  },

  navigation: [
    { label: "About", href: "/about" },
    { label: "Tests", href: "/tests" },
    { label: "Cart", href: "/cart" },
    { label: "Packages", href: "/packages" },
    { label: "Home Sampling", href: "/home-sampling" },
    { label: "For Doctors", href: "/doctors" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
};