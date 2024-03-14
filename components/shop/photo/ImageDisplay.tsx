import React from "react";
import PhotoSwipeCarousel from "./PhotoSwipeCarousel";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { CarouselCn } from "./CarouselCn";

type Props = {
  item: ItemWithPicThumbFav;
};

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
