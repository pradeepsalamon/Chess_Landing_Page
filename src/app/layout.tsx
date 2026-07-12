import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "GrandMaster Chess Academy | Professional Online Chess Training",
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
    title: "GrandMaster Chess Academy | Professional Online Chess Training",
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
      <body className="min-h-screen bg-[#0a0a0f] font-[family-name:var(--font-inter)]">
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
