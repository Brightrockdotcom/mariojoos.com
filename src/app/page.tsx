import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorSpotlight from "@/components/CursorSpotlight";

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <main>
        <Hero />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Newsletter />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
