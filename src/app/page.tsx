import Hero from "@/components/Hero";
import CursorSpotlight from "@/components/CursorSpotlight";
import { getCreators } from "@/lib/creators";

export default async function Home() {
  const creators = await getCreators();

  return (
    <>
      <CursorSpotlight />
      <main>
        <Hero creators={creators} />
      </main>
    </>
  );
}
