import Image from "next/image";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";

interface Props {
  cardType: "featured" | "shop";
  href: string;
  thumbnail: {
    name: string;
    width: number;
    height: number;
  };

  title: string;
  description?: string;
  price: number;
}

const MerchandiseCard = ({
  href,
  cardType,
  thumbnail,
  title,
  description,
  price,
}: Props) => {
  if (cardType === "shop")
    return (
      <div className="border-2 bg-white rounded-md flex flex-col w-64 space-y-4">
        <div className="w-full relative h-64 border-b-2">
          <Link className="absolute w-full h-64" href={href}>
            <Image
              src={`/uploads/${thumbnail.name}`}
              alt={title}
              fill
              sizes="30vw"
              className="object-cover rounded-t-md hover:brightness-75"
            />
          </Link>
        </div>

        <div className="flex flex-col !mt-0 gap-3 px-4 py-3 justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">
              {capitalizeFirstLetter(title)}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="default">
              <Link href={href}>Details</Link>
            </Button>
            <div className="flex gap-1">
              <p>{formatToEuroCurrency(price)}</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (cardType === "featured")
    return (
      <div className="border-2 bg-white rounded-md flex flex-col w-56 h-[30rem] space-y-4">
        <div className="w-full h-[30rem] relative border-b-2">
          <Image
            src={`/uploads/${thumbnail.name}`}
            alt={title}
            fill
            sizes="30vw"
            className="object-cover rounded-t-md"
          />
        </div>

        <div className="flex flex-col h-full !mt-0 gap-3 p-2">
          <div className="flex flex-col h-48">
            <h3 className="font-bold text-xl">
              {capitalizeFirstLetter(title)}
            </h3>
            <ScrollArea className="pr-2">{description}</ScrollArea>
          </div>
          <div className="flex justify-around items-center">
            <Button variant="default">
              <Link href={href}>Details</Link>
            </Button>
            <div className="flex gap-1">
              <p>{formatToEuroCurrency(price)}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MerchandiseCard;
