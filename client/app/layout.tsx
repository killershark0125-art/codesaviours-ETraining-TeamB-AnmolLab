import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import RouteScrollReset from "@/components/layout/route-scroll-reset";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Manrope is a variable font: one file covers every weight used in the CSS.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anmol Health Care Lab",
  description:
    "Explore diagnostic test information and connect with Anmol Health Care Lab in Faisalabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}