
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anmol Lab | Diagnostic Laboratory",
  description:
    "Anmol Lab diagnostic laboratory website. Explore laboratory tests, health packages and available services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
