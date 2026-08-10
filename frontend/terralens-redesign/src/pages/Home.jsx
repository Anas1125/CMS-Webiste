import Hero from "../components/Hero/Hero";
import Statement from "../components/Statement/Statement";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Statistics from "../components/Statistics/Statistics";
import CTA from "../components/CTA/CTA";
import Technology from "../components/Technology/Technology";
import GlobalOffices from "../components/GlobalOffices/GlobalOffices";

export default function Home() {
  return (
    <>
      <div >
        <Hero />
        <Statement />
        <WhyChoose />
        <Statistics />
        <Technology />
        <GlobalOffices />
        <CTA />
      </div>
    </>
  );
}