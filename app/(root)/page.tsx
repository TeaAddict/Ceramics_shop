import CarouselSection from "@/components/homepage/CarouselSection";
import Hero from "@/components/homepage/Hero";
import Faq from "@/components/shared/Faq";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";

export default async function Home() {
  const sortBy = await getGeneralSettings();

  return (
    <section>
      <Hero />
      <CarouselSection sortBy={sortBy?.featuredSort} />
      <Faq />
    </section>
  );
}
