"use client";

import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MerchandiseCard from "@/components/cards/Merchandise";
import { useItems } from "@/hooks/useItems";

const CarouselSection = () => {
  const { data } = useItems();

  if (!data || data?.length === 0) return;
  const items = data.slice(0, 6);

  return (
    <article className="my-10 flex justify-center">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Featured Works</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="px-10 sm:px-20 md:px-0 w-full max-w-3xl"
        >
          <CarouselContent>
            {items &&
              items.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <MerchandiseCard
                      item={item}
                      href={`/shop/${item.id}`}
                      cardType="featured"
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      thumbnail={{
                        name: item.thumbnail.name,
                        width: item.thumbnail.width,
                        height: item.thumbnail.height,
                      }}
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
