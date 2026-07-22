import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";
import ThemeProvider from "@/components/ThemeProvider";
import TrackingProvider from "@/components/TrackingProvider";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                new URLSearchParams(window.location.search).get("feedback") ||
                sessionStorage.getItem("review-mode") === "true"
              ) {
                var s = document.createElement("script");
                s.src = "https://feedback-cdn.marmeto.org/feedback.js?projectID=b0ea7c43-6e62-4aa7-adbc-e2c9163a269c";
                s.async = true;
                document.head.appendChild(s);
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-inter)] bg-[var(--background)] text-[var(--text-primary)]">
        <ThemeProvider />
        <TrackingProvider />
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
