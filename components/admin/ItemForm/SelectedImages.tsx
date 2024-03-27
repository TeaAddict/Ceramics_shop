import { ScrollArea } from "@/components/ui/scroll-area";
import { TItemSchema } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

const SelectedImages = ({
  imgBlobUrl,
  thumbnailPicture,
  images,
  setValue,
  isLoading,
}: {
  imgBlobUrl: string[];
  thumbnailPicture: string;
  images: FileList | File[] | string[];
  setValue: UseFormSetValue<TItemSchema>;
  isLoading?: boolean;
}) => {
  const isStringArray =
    Array.isArray(images) && images.every((img) => typeof img === "string");

  function handleClick(index: number) {
    if (isLoading) return;
    setValue(
      "thumbnailPicture",
      isStringArray ? (images[index] as string) : (images[index] as File).name
    );
  }

  return (
    <ScrollArea
      className={`flex justify-center h-64 ${
        isLoading && "opacity-40 cursor-not-allowed"
      } `}
    >
      <div className="grid grid-cols-2">
        {imgBlobUrl.map((image, index) => {
          const isThumbnail =
            (isStringArray && thumbnailPicture === (images[index] as string)) ||
            (!isStringArray &&
              thumbnailPicture === (images[index] as File)?.name);
          return (
            <div
              key={image}
              onClick={() => handleClick(index)}
              className={`w-auto aspect-square relative hover:brightness-50 ${
                isThumbnail && "border-4 border-primary"
              }`}
            >
              <Image
                alt="Merchandise image"
                fill
                src={image}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 500px) 100px"
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default SelectedImages;
