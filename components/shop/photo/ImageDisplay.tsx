import React from "react";
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
      <CarouselCn images={item.pictures} galleryID="item" />
    </div>
  );
};

export default ImageDisplay;
