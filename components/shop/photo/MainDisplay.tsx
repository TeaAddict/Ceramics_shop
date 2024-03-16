"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Pictures } from "./ImageShowcase";

type Props = {
  images: Pictures[];
  galleryID: string;
};

const MainDisplay = ({ images, galleryID }: Props) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

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
      showHideAnimationType: "fade",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null!;
    };
  }, [galleryID]);
  return (
    <div>
      <Carousel
        setApi={setMainApi}
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <div className="pswp-gallery" id={galleryID}>
          <CarouselContent>
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
                          className="object-cover rounded-md"
                          src={`/uploads/${image.name}`}
                          alt="carouselImg"
                          fill
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
    </div>
  );
};

export default MainDisplay;
