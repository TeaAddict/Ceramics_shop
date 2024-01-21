"use client";
import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Image {
  largeURL: string;
  width: number;
  height: number;
  thumbnailURL: string;
}

interface SimpleGalleryProps {
  galleryID: string;
  images: Image[];
}

const PhotoSwipeCarousel: React.FC<SimpleGalleryProps> = (props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null!;
    };
  }, [props.galleryID]);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <div className="pswp-gallery" id={props.galleryID}>
        <CarouselContent>
          {props.images.map((image, index) => (
            <CarouselItem key={image.thumbnailURL}>
              <div className="p-1">
                <Card>
                  <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={props.galleryID + "-" + index}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                      <Image
                        className="object-cover rounded-md"
                        src={image.thumbnailURL}
                        alt=""
                        fill
                        sizes="30vw"
                      />
                    </CardContent>
                  </a>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PhotoSwipeCarousel;
