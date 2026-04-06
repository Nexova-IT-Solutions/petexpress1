import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetExpress Sri Lanka | Professional Pet Relocation Services",
  description: "IATA and IPATA accredited pet relocation company providing international pet transportation, door-to-door logistics, veterinary services, and custom crate building in Sri Lanka.",
};

import { MainLayout } from "@/components/layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-dvh flex font-sans bg-white overflow-x-hidden">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
