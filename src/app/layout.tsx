import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mario Joos — YouTube Retention Strategist",
  description:
    "Mario Joos is the retention strategist behind YouTube's biggest creators. Trusted by MrBeast, KSI, Preston, and top creators worldwide. Billions of views influenced through data-driven audience retention strategy.",
  keywords: [
    "YouTube strategist",
    "audience retention",
    "content strategy",
    "YouTube growth",
    "Mario Joos",
    "retention director",
    "creator consulting",
  ],
  openGraph: {
    title: "Mario Joos — YouTube Retention Strategist",
    description:
      "The strategist behind YouTube's biggest creators. Billions of views influenced.",
    url: "https://mariojoos.com",
    siteName: "Mario Joos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Joos — YouTube Retention Strategist",
    description:
      "The strategist behind YouTube's biggest creators. Billions of views influenced.",
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
        className={`${nunito.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
