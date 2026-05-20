import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import RetentionChart from "@/components/RetentionChart";
import Clients from "@/components/Clients";
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
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <RetentionChart />
        <div className="section-divider" />
        <Clients />
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
