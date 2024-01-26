"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MerchandiseCard from "@/components/cards/Merchandise";

const CarouselSection = () => {
  const [items, setItems] = useState<
    {
      id: number;
      title: string;
      price: number;
      stock: number;
      category: string;
      description: string;
      thumbnailPicture: string;
      pictures?: any;
    }[]
  >();

  useEffect(() => {
    fetch("/api/item", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  if (items?.length === 0) return;

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
            {items &&
              items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-[60%] lg:basis-[45%] xl:basis-[35%] 2xl:basis-[33%]"
                >
                  <div className="p-1">
                    <MerchandiseCard
                      href={`/shop/${item.id}`}
                      cardType="featured"
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      thumbnailPicture={{
                        name: item.thumbnailPicture,
                        width: 1,
                        height: 1,
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
