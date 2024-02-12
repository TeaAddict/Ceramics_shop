import Image from "next/image";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { EditItemModal } from "../admin/EditItemModal";
import { ProductSchema } from "@/lib/types";

interface Props {
  cardType: "featured" | "shop";
  item: ProductSchema;
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
  item,
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
      <div className="border-2 bg-white rounded-md flex flex-col space-y-4">
        <div className="relative border-b-2 aspect-square">
          <Link className="absolute w-full h-full" href={href}>
            <Image
              src={`/uploads/${thumbnail.name}`}
              alt={title}
              fill
              sizes="30vw"
              className="object-cover rounded-t-md hover:brightness-75"
            />
          </Link>
        </div>

        <div className="flex flex-col !mt-0 gap-3 px-4 py-3 justify-between overflow-hidden">
          <h3 className="font-bold text-xl">{capitalizeFirstLetter(title)}</h3>

          <div className="flex justify-between items-center">
            {isAdmin ? (
              <div className="justify-center flex">
                <EditItemModal item={item} />
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
      <div className="border-2 bg-white rounded-md flex flex-col space-y-4 overflow-hidden">
        <div className="relative border-b-2 aspect-square">
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

        <div className="sm:flex flex-col !mt-0 gap-1 p-2 hidden">
          <div className="flex flex-col gap-2 overflow-hidden">
            <h3 className="font-bold text-xl">
              {capitalizeFirstLetter(title)}
            </h3>
          </div>
          <div className="flex gap-2 break-all">
            <p>{formatToEuroCurrency(price)}</p>
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] !m-2 gap-2 justify-around sm:hidden ">
          <div className="overflow-hidden break-all">
            <h3 className="font-bold text-xl">
              {capitalizeFirstLetter(title)}
            </h3>
          </div>
          <div className="flex gap-1 justify-center overflow-hidden break-all">
            <p className="">{formatToEuroCurrency(price)}</p>
          </div>
        </div>
      </div>
    );
};

export default MerchandiseCard;
