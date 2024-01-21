import Merchandise from "@/components/cards/Merchandise";
import { TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MerchandiseCard from "@/components/cards/Merchandise";

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
            {TEST_MERCHANDISE2.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-[60%] lg:basis-[45%] xl:basis-[35%] 2xl:basis-[33%]"
              >
                <div className="p-1">
                  <MerchandiseCard
                    href={`/shop/${item.id}`}
                    cardType="featured"
                    currencyType={item.currencyType}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    thumbnailImage={item.thumbnailImage}
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
