"use client";
import React, { useEffect, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Pictures } from "./ImageShowcase";

type Props = {
  images: Pictures[];
  galleryID: string;
  setMainApi: React.Dispatch<any>;
  autoplay: boolean;
};

const MainDisplay = ({ images, galleryID, setMainApi, autoplay }: Props) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

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
    <Carousel
      setApi={setMainApi}
      plugins={autoplay ? [plugin.current] : []}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
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
  );
};

export default MainDisplay;
