
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anmol Health Care Lab | Faisalabad",
  description:
    "Explore diagnostic test information and connect with Anmol Health Care Lab in Faisalabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
