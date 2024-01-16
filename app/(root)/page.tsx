import CarouselSection from "@/components/homepage/CarouselSection";
import Hero from "@/components/homepage/Hero";
import Faq from "@/components/shared/Faq";
import Test from "@/components/shared/Test";

export default function Home() {
  return (
    <section>
      {/* <h1 className="text-2xl font-bold pb-5">Homepage</h1> */}
      <Hero />
      <CarouselSection />
      <Faq />
    </section>
  );
}
