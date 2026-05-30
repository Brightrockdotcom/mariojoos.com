import type { Metadata } from "next";
import NewsletterForm from "./NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter — Mario Joos",
  description:
    "Retention insights in your inbox. Industry insights and exclusive strategies to keep people watching.",
  openGraph: {
    title: "Newsletter — Mario Joos",
    description:
      "Retention insights in your inbox. Industry insights and exclusive strategies to keep people watching.",
    url: "https://mariojoos.com/newsletter",
    siteName: "Mario Joos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter — Mario Joos",
    description:
      "Retention insights in your inbox. Industry insights and exclusive strategies to keep people watching.",
  },
};

export default function NewsletterPage() {
  return <NewsletterForm />;
}
