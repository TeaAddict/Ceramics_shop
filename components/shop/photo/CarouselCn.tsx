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
      mainApi.scrollTo(index);
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

  //TODO DELETE
  const arr = Array.from(Array(20).keys());
  return (
    <div className="w-[15rem] xs:w-[20rem] md:w-[30rem]">
      {/* <Carousel className="w-full max-w-sm" setApi={setMainApi}> */}
      <Carousel className="" setApi={setMainApi}>
        {/* <CarouselContent className="-ml-1"> */}
        <CarouselContent className="">
          {items.map((item) => (
            <CarouselItem key={item.name} className="pl-4">
              <div className="p-1">
                <Card className="cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      alt="carouselImg"
                      src={`/uploads/${item.name}`}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 500px) 100px"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {items.length > 1 && (
        <Carousel
          className="w-full overflow-hidden"
          setApi={setThumbApi}
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-0">
            {items.map((item, index) => (
              <CarouselItem
                key={item.name}
                className="pl-1 basis-20"
                onClick={() => {
                  onThumbClick(index);
                }}
              >
                <Card
                  className={`${
                    selectedIndex === index &&
                    "outline outline-primary outline-4 -outline-offset-1 rounded-sm"
                  } cursor-pointer m-1`}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      alt="carouselImg"
                      src={`/uploads/${item.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 500px) 100px"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
