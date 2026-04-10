import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mario Joos — World's #1 YouTube Retention Strategist",
  description:
    "Mario Joos is the world's leading YouTube retention strategist, trusted by MrBeast, KSI, Preston, and top creators worldwide. Billions of views influenced through data-driven audience retention strategy.",
  keywords: [
    "YouTube strategist",
    "audience retention",
    "MrBeast",
    "content strategy",
    "YouTube growth",
    "Mario Joos",
    "retention director",
  ],
  openGraph: {
    title: "Mario Joos — World's #1 YouTube Retention Strategist",
    description:
      "Trusted by the biggest creators on YouTube. Billions of views influenced.",
    url: "https://mariojoos.com",
    siteName: "Mario Joos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Joos — World's #1 YouTube Retention Strategist",
    description:
      "Trusted by the biggest creators on YouTube. Billions of views influenced.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
