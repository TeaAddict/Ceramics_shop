"use client";
import React, { useCallback, useEffect, useState } from "react";
import "photoswipe/style.css";
import { CarouselApi } from "@/components/ui/carousel";
import MainDisplay from "./MainDisplay";
import { ImageListDisplay } from "./ImageListDisplay";

export type Pictures = {
  name: string;
  width: number;
  height: number;
};

type Props = {
  images: Pictures[];
  autoplay?: boolean;
  galleryID?: string;
};

export function ImageShowcase({
  images,
  autoplay = false,
  galleryID = "image-showcase",
}: Props) {
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

  return (
    <div className="w-[15rem] xs:w-[20rem] md:w-[30rem]">
      <MainDisplay
        galleryID={galleryID}
        images={images}
        setMainApi={setMainApi}
        autoplay={autoplay}
      />

      {images.length > 1 && (
        <ImageListDisplay
          images={images}
          mainApi={mainApi}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setThumbApi={setThumbApi}
          thumbApi={thumbApi}
        />
      )}
    </div>
  );
}
