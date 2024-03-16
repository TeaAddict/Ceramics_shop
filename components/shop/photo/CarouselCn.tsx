"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import PhotoSwipeLightbox from "photoswipe/lightbox";

type Pictures = {
  id: string;
  name: string;
  width: number;
  height: number;
  itemId: string;
};

type Props = {
  images: Pictures[];
  galleryID: string;
};

export function CarouselCn({ images, galleryID }: Props) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
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

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null!;
    };
  }, [galleryID]);

  return (
    <div className="w-[15rem] xs:w-[20rem] md:w-[30rem]">
      <Carousel
        className=""
        setApi={setMainApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <div className="pswp-gallery" id={galleryID}>
          <CarouselContent className="">
            {images.map((image, index) => (
              <CarouselItem key={image.name} className="pl-4">
                <div className="p-1">
                  <Card className="cursor-pointer">
                    <a
                      href={`/uploads/${image.name}`}
                      data-pswp-width={image.width}
                      data-pswp-height={image.height}
                      key={galleryID + "-" + index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                        <Image
                          alt="carouselImg"
                          src={`/uploads/${image.name}`}
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 500px) 100px"
                        />
                      </CardContent>
                    </a>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

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
