import type { Metadata } from "next";
import NewsletterForm from "./NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter — Mario Joos",
  description:
    "Retention tactics in your inbox. The breakdowns Mario Joos sends creators — what actually keeps audiences watching.",
  openGraph: {
    title: "Newsletter — Mario Joos",
    description:
      "Retention tactics in your inbox. What actually keeps audiences watching.",
    url: "https://mariojoos.com/newsletter",
    siteName: "Mario Joos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter — Mario Joos",
    description:
      "Retention tactics in your inbox. What actually keeps audiences watching.",
  },
};

export default function NewsletterPage() {
  return <NewsletterForm />;
}
