import Image from "next/image";
import React from "react";
import Link from "next/link";
import { formatToEuroCurrency } from "@/utils/helper";
import { EditItemModal } from "../admin/EditItemModal";
import { ProductSchema } from "@/lib/types";
import DeleteItemButton from "../admin/DeleteItemButton";

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
  isAdmin: boolean;
}

const Merchandise = ({
  item,
  href,
  thumbnail,
  title,
  description,
  price,
  isAdmin,
}: Props) => {
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
          <h3 className="font-bold text-xl capitalize">{title}</h3>

          <div className="flex flex-col items-center gap-3">
            <div className="w-full flex justify-between items-center">
              <p>{formatToEuroCurrency(price)}</p>
              {item.stock < 1 && (
                <p className="font-semibold uppercase text-destructive">
                  sold out
                </p>
              )}
            </div>

            <div className="flex w-full justify-between gap-3">
              <DeleteItemButton id={item.id} />
              <EditItemModal item={item} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`border-2 bg-white rounded-md flex flex-col space-y-4 
      hover:brightness-90 ${item.stock < 1 && "grayscale"}`}
      >
        <Link href={href}>
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
            <h3 className="font-bold text-xl capitalize">{title}</h3>
            {item.stock > 0 ? (
              <p>{formatToEuroCurrency(price)}</p>
            ) : (
              <p className="uppercase font-bold">sold out</p>
            )}
          </div>
        </Link>
      </div>
    );
  }
};

export default Merchandise;
