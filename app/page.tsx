import Header from "@/components/Header";
import PartnerBanner from "@/components/PartnerBanner";
import Hero from "@/components/Hero";
import Pains from "@/components/Pains";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Dreams from "@/components/Dreams";
import Plans from "@/components/Plans";
import Subjects from "@/components/Subjects";
import Requirements from "@/components/Requirements";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import OfferPopup from "@/components/OfferPopup";

export default function Home() {
  return (
    <>
      <PartnerBanner />
      <Header />
      <main className="relative">
        <Hero />
        <Pains />
        <HowItWorks />
        <Benefits />
        <Dreams />
        <Plans />
        <Subjects />
        <Requirements />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OfferPopup />
    </>
  );
}
