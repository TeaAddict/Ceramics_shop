import Image from "next/image";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { EditItemModal } from "../admin/EditItemModal";

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
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");

  if (cardType === "shop")
    return (
      <div className="border-2 bg-white rounded-md flex flex-col  space-y-4">
        <div className="w-full relative h-60 xs:h-96 md:h-60 border-b-2">
          <Link className="absolute w-full h-60 xs:h-96 md:h-60" href={href}>
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
            {isAdmin ? (
              <div className="justify-center flex">
                <EditItemModal />
              </div>
            ) : (
              <Button variant="default">
                <Link href={href}>Details</Link>
              </Button>
            )}
            <div className="flex gap-1">
              <p>{formatToEuroCurrency(price)}</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (cardType === "featured")
    return (
      <div className="border-2 bg-white rounded-md grid grid-rows-[1.2fr_0.8fr] sm:grid-rows-2 h-[20rem] xs:h-[25rem] sm:h-[30rem] space-y-4">
        <div className="w-full relative border-b-2">
          <Link className="absolute w-full h-full" href={href}>
            <Image
              src={`/uploads/${thumbnail.name}`}
              alt={title}
              fill
              sizes="30vw"
              className="object-cover rounded-t-md"
            />
          </Link>
        </div>

        <div className="sm:flex flex-col h-full !mt-0 gap-3 p-2 hidden">
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
        <div className="flex flex-col !m-2 gap-2 justify-center sm:hidden">
          <h3 className="font-bold text-xl">{capitalizeFirstLetter(title)}</h3>
          <div className="flex gap-1">
            <p>{formatToEuroCurrency(price)}</p>
          </div>
        </div>
      </div>
    );
};

export default MerchandiseCard;
