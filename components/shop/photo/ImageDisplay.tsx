import React from "react";
import { ItemWithPicThumbFav } from "@/prisma/prismaTypes";
import { ImageShowcase } from "./ImageShowcase";

type Props = {
  item: ItemWithPicThumbFav;
};

const ImageDisplay = ({ item }: Props) => {
  return (
    <div>
      <ImageShowcase images={item.pictures} galleryID="item" />
    </div>
  );
};

export default ImageDisplay;
