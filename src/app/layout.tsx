import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blake McGinn | AI Marketing Consultant",
  description: "I help businesses implement AI that drives real results — not hype, not experiments, but systems that scale.",
  keywords: ["AI consulting", "marketing automation", "AI tools", "business intelligence"],
  openGraph: {
    title: "Blake McGinn | AI Marketing Consultant",
    description: "I help businesses implement AI that drives real results — not hype, not experiments, but systems that scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {/* Animated mesh gradient background */}
        <div className="mesh-gradient">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
        </div>
        {children}
      </body>
    </html>
  );
}
