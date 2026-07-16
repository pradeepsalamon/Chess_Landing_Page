import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Nexa Chess Academy | Professional Online Chess Training",
  description:
    "Master chess with expert coaching. Professional online chess training for Beginners, Intermediate, and Advanced players. Book your free demo class today!",
  keywords: [
    "chess academy",
    "online chess classes",
    "chess coaching",
    "learn chess",
    "chess training",
    "chess for kids",
    "tournament preparation",
  ],
  openGraph: {
    title: "Nexa Chess Academy | Professional Online Chess Training",
    description:
      "Master chess with expert coaching. Professional online chess training for all levels.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen font-[family-name:var(--font-inter)]">
        <ThemeProvider />
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
