import type { Metadata } from "next";
import NewsletterLanding from "./NewsletterLanding";
import { getCreators } from "@/lib/creators";

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

export default async function NewsletterPage() {
  const creators = await getCreators();
  return <NewsletterLanding creators={creators} />;
}
