import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TODO: make it updatable
const Faq = () => {
  return (
    <article className="flex flex-col justify-center my-20 mx-auto max-w-[50vw] w-full gap-5">
      <h2 className="text-2xl font-semibold">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Can I request custom designs or personalized ceramics?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! We offer custom orders and personalization services.
            Contact us with your ideas, and we&apos;ll work with you to create a
            unique and special piece.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Are your ceramics handmade?</AccordionTrigger>
          <AccordionContent>
            Yes, the majority of our ceramics are handmade by skilled artisans.
            Each piece is unique, and slight variations in color and texture are
            part of the charm of handmade items.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I visit your physical store to see the ceramics in person?
          </AccordionTrigger>
          <AccordionContent>
            Currently, we operate as an online store, and our ceramics are
            available for purchase through our website. We do not have a
            physical storefront, but we provide detailed product descriptions
            and images to help you make informed decisions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
};

export default Faq;
