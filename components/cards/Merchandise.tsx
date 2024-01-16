import Image from "next/image";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Props {
  image: string;
  title: string;
  description: string;
  price: number;
  currencyType: string;
}

const Merchandise = ({
  image,
  title,
  description,
  price,
  currencyType,
}: Props) => {
  return (
    <li className="border-2 bg-white rounded-md flex flex-col w-56 h-[30rem] space-y-4">
      <div className="w-full h-[30rem] relative border-b-2">
        <Image
          src={image}
          alt={title}
          fill
          sizes="30vw"
          className="object-cover rounded-t-md"
        />
      </div>

      <div className="flex flex-col h-full !mt-0 gap-3 p-2">
        <div className="flex flex-col h-48">
          <h3 className="font-bold text-xl">{title}</h3>
          <ScrollArea className="pr-2">{description}</ScrollArea>
        </div>
        <div className="flex justify-around items-center">
          <Button variant="default">Details</Button>
          <div className="flex gap-1">
            <p>{price}</p>
            <p>{currencyType}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Merchandise;
