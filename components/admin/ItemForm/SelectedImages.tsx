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
}: {
  imgBlobUrl: string[];
  thumbnailPicture: string;
  images: FileList | File[];
  setValue: UseFormSetValue<TItemSchema>;
}) => {
  return (
    <ScrollArea className="flex justify-center h-64">
      <div className="grid grid-cols-2">
        {imgBlobUrl.map((image, index) => {
          return (
            <div
              key={image}
              onClick={() => setValue("thumbnailPicture", images[index].name)}
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
