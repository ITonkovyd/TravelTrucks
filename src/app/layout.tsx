import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: {
    default: "Travel Trucks",
    template: "%s | Travel Trucks",
  },
  description:
    "Campers of your dreams. You can find everything you want in our catalog.",
  keywords: [
    "campers",
    "travel trucks",
    "RV rental",
    "camper van",
    "motorhome",
  ],
  authors: [{ name: "Travel Trucks" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Travel Trucks",
    title: "Travel Trucks",
    description:
      "Campers of your dreams. You can find everything you want in our catalog.",
  },
  twitter: {
    title: "Travel Trucks",
    description:
      "Campers of your dreams. You can find everything you want in our catalog.",
  },
};

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${InterFont.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
