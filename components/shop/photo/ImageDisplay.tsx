import React from "react";
import PhotoSwipeCarousel from "./PhotoSwipeCarousel";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { CarouselCn } from "./CarouselCn";
import { EmblaOptionsType } from "embla-carousel";

type Props = {
  item: ItemWithPicThumbFav;
};

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const ImageDisplay = ({ item }: Props) => {
  return (
    <div>
      {/* <PhotoSwipeCarousel
        galleryID="testing"
        images={item.pictures.map((image) => {
          return {
            largeURL: image.name,
            thumbnailURL: image.name,
            width: image.width,
            height: image.height,
          };
        })}
      /> */}
      {/* <p className="hidden md:block">===IDK SOME FANCY IMAGE SLIDE===</p> */}
      <CarouselCn items={item.pictures} />
    </div>
  );
};

export default ImageDisplay;
