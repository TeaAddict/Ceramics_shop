"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Pictures = {
  id: string;
  name: string;
  width: number;
  height: number;
  itemId: string;
};

type Props = {
  items: Pictures[];
};

export function CarouselCn({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      thumbApi.scrollTo(index);
      setSelectedIndex(index);
      mainApi.scrollTo(thumbApi.selectedScrollSnap());
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
  }, [mainApi, onSelect]);

  return (
    <div>
      <Carousel className="w-full max-w-sm" setApi={setMainApi}>
        <CarouselContent className="-ml-1">
          {items.map((item) => (
            <CarouselItem key={item.name} className="pl-1">
              <div className="p-1">
                <Card className="cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      alt="carouselImg"
                      src={`/uploads/${item.name}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        className="w-full max-w-sm"
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-1">
          {items.map((item, index) => (
            <CarouselItem
              key={item.name}
              className="pl-1 basis-1/3"
              onClick={() => {
                onThumbClick(index);
              }}
            >
              <div className="p-1">
                <Card
                  className={`${
                    selectedIndex === index &&
                    "outline outline-primary outline-4 -outline-offset-1 rounded-sm"
                  } cursor-pointer`}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      alt="carouselImg"
                      src={`/uploads/${item.name}`}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
