import { useTranslation } from "@/app/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TODO: make it updatable
const Faq = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "home");
  return (
    <article className="flex flex-col justify-center my-20 mx-auto max-w-[50vw] w-full gap-5">
      <h2 className="text-2xl font-semibold">{t("faq.h1")}</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("faq.p1_1")}</AccordionTrigger>
          <AccordionContent>{t("faq.p1_2")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("faq.p2_1")}</AccordionTrigger>
          <AccordionContent>{t("faq.p2_2")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t("faq.p3_1")}</AccordionTrigger>
          <AccordionContent>{t("faq.p3_2")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
};

export default Faq;
