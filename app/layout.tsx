import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cult Coins",
  description: "Design & Code by Degen Vibes LLC",
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
