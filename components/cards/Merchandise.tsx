import Image from "next/image";
import React from "react";
import Link from "next/link";
import { capitalizeFirstLetter, formatToEuroCurrency } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { EditItemModal } from "../admin/EditItemModal";
import { ProductSchema } from "@/lib/types";

interface Props {
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
  thumbnail,
  title,
  description,
  price,
}: Props) => {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");

  if (isAdmin) {
    return (
      <div className="border-2 bg-white rounded-md flex flex-col space-y-4">
        <div className="relative border-b-2 aspect-square">
          <Link className="absolute w-full h-full" href={href}>
            <Image
              src={`/uploads/${thumbnail.name}`}
              alt={title}
              fill
              sizes="30vw"
              className="object-cover rounded-t-md hover:brightness-90"
            />
          </Link>
        </div>

        <div className="flex flex-col !mt-0 gap-3 px-4 py-3 justify-between overflow-hidden">
          <h3 className="font-bold text-xl">{capitalizeFirstLetter(title)}</h3>

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>{formatToEuroCurrency(price)}</p>
            </div>
            {isAdmin && (
              <div className="justify-center flex">
                <EditItemModal item={item} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        href={href}
        className="border-2 bg-white rounded-md flex flex-col space-y-4 
        hover:brightness-90"
      >
        <div className="relative border-b-2 aspect-square">
          <div className="absolute w-full h-full">
            <Image
              src={`/uploads/${thumbnail.name}`}
              alt={title}
              fill
              sizes="30vw"
              className={`object-cover rounded-t-md ${
                isAdmin && "hover:brightness-75"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col !mt-0 gap-3 px-4 py-3 justify-between overflow-hidden">
          <h3 className="font-bold text-xl">{capitalizeFirstLetter(title)}</h3>

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>{formatToEuroCurrency(price)}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default MerchandiseCard;
