import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/common/wallet";

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
      <body><WalletProvider>{children}</WalletProvider></body>
    </html>
  );
}
