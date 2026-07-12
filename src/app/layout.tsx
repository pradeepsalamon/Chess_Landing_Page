import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

const proxyFixScript = `
  const forceVisible = () => {
    document.querySelectorAll('[style]').forEach(el => {
      // Framer Motion sets inline opacity to exactly "0" on initial load
      if (el.style.opacity === '0') {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
      }
    });
  };

  try {
    const isProxy = window.self !== window.top || window.location.hostname.includes('ruttl');
    if (isProxy) {
      // Run immediately and then poll to catch any dynamic elements
      forceVisible();
      setInterval(forceVisible, 300);
    }
  } catch(e) {
    // Cross-origin iframe (like Ruttl) throws SecurityError on window.top
    forceVisible();
    setInterval(forceVisible, 300);
  }
`;

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
        <script dangerouslySetInnerHTML={{ __html: proxyFixScript }} />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
