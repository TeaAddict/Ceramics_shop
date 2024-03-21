import { ScrollArea } from "@/components/ui/scroll-area";
import { TItemSchema } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const SelectedImages = ({
  imgBlobUrl,
  thumbnailPicture,
  images,
  setValue,
  isLoading,
}: {
  imgBlobUrl: string[];
  thumbnailPicture: string;
  images: FileList | File[];
  setValue: UseFormSetValue<TItemSchema>;
  isLoading?: boolean;
}) => {
  function handleClick(index: number) {
    if (isLoading) return;
    setValue("thumbnailPicture", images[index].name);
  }

  return (
    <ScrollArea
      className={`flex justify-center h-64 ${
        isLoading && "opacity-40 cursor-not-allowed"
      } `}
    >
      <div className="grid grid-cols-2">
        {imgBlobUrl.map((image, index) => {
          return (
            <div
              key={image}
              // onClick={() => setValue("thumbnailPicture", images[index].name)}
              onClick={() => handleClick(index)}
              className={`w-auto aspect-square relative hover:brightness-50 ${
                thumbnailPicture === images[index]?.name &&
                "border-4 border-primary"
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
