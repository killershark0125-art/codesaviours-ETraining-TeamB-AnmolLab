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
  // Printed on the client's report as "Precision in Every Test Care in every
  // Patient". Punctuation is pending client confirmation.
  tagline: "Precision in every test. Care in every patient.",
  description:
    "Search diagnostic tests, book a test and contact Anmol Health Care Lab in Faisalabad.",
  address,
  area: "Sultani Chowk",
  city: "Faisalabad",
  // Directions open a Google Maps search for the printed address. Replace with
  // the official pin once the client supplies it.
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`,
  phones: [
    { display: "0316-6474766", href: "tel:+923166474766" },
    { display: "0321-6671476", href: "tel:+923216671476" },
  ] satisfies Phone[],
  email: "anmollaboratory@gmail.com",
  /**
   * WhatsApp number in international format, digits only (for example
   * "923001234567"). Leave null until the client confirms which number
   * supports WhatsApp; the floating button stays hidden while this is null.
   */
  whatsappNumber: null as string | null,
  routes: {
    home: "/",
    book: "/book",
    reports: "/reports",
    contact: "/contact",
  },
  navigation: [
    { label: "About", href: "/about" },
    { label: "Tests", href: "/tests" },
    { label: "Packages", href: "/packages" },
    { label: "Home Sampling", href: "/home-sampling" },
    { label: "Branches", href: "/branches" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
};
