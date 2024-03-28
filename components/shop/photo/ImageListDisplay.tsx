"use client";
import React, { useCallback } from "react";
import "photoswipe/style.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Pictures } from "./ImageShowcase";

type Props = {
  images: Pictures[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  mainApi: any;
  thumbApi: any;
  setThumbApi: React.Dispatch<any>;
};

export function ImageListDisplay({
  images,
  selectedIndex,
  setSelectedIndex,
  mainApi,
  thumbApi,
  setThumbApi,
}: Props) {
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      thumbApi.scrollTo(index);
      setSelectedIndex(index);
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi, setSelectedIndex]
  );

  return (
    <>
      {images.length > 1 && (
        <Carousel
          className="w-full overflow-hidden"
          setApi={setThumbApi}
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-0">
            {images.map((item, index) => (
              <CarouselItem
                key={item.name}
                className="pl-1 basis-20"
                onClick={() => {
                  onThumbClick(index);
                }}
              >
                <Card
                  className={`${
                    selectedIndex === index
                      ? "outline outline-primary"
                      : "hover:outline hover:outline-gray-300"
                  } cursor-pointer m-1 outline-4 -outline-offset-1 rounded-sm`}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      alt="carouselImg"
                      src={item.url ?? ""}
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
    </>
  );
}
