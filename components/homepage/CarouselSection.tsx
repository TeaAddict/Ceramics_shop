import Merchandise from "@/components/cards/Merchandise";
import { TEST_MERCHANDISE } from "@/constants";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselSection = () => {
  return (
    <article className="justify-center flex my-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Featured Works</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[50vw]"
        >
          <CarouselContent>
            {TEST_MERCHANDISE.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-[60%] lg:basis-[45%] xl:basis-[35%] 2xl:basis-[29%]"
              >
                <div className="p-1">
                  <Merchandise
                    currencyType={item.currencyType}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </article>
  );
};

export default CarouselSection;
