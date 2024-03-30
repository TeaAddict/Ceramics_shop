import Image from "next/image";
import React from "react";
import Link from "next/link";
import { formatToEuroCurrency } from "@/utils/helper";
import { EditItemModal } from "../admin/EditItemModal";
import { ProductSchema } from "@/lib/types";
import DeleteItemButton from "../admin/DeleteItemButton";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { ModalWindow } from "../shared/ModalWindow";
import DeleteItemModal from "../admin/DeleteItemModal";

interface Props {
  item: ProductSchema;
  href: string;
  thumbnail: {
    name: string;
    width: number;
    height: number;
    url: string;
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
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");

  if (isAdmin) {
    return (
      <div className="border-2 bg-white rounded-md flex flex-col">
        <div className="relative border-b-2 aspect-square">
          {thumbnail ? (
            <Link className="absolute w-full h-full" href={href}>
              <Image
                src={thumbnail.url}
                alt={title}
                fill
                sizes="(max-width: 500px) 100px"
                className="object-cover rounded-t-md hover:brightness-90"
              />
            </Link>
          ) : (
            <LoadPage />
          )}
        </div>
        <div className="flex flex-col sm:gap-3 px-1 sm:px-4 py-1 ms:py-3 sm:pb-3 justify-between overflow-hidden">
          <h3 className="font-bold text-xl capitalize">{title}</h3>

          <div className="flex flex-col items-center gap-1">
            <div className="w-full flex flex-wrap justify-between items-center gap-1">
              <p>{formatToEuroCurrency(price)}</p>
              {item.stock < 1 && (
                <p className="font-semibold uppercase text-destructive">
                  {t("soldOut")}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap w-full justify-between gap-1">
              <EditItemModal item={item} />
              <DeleteItemModal id={item.id} />
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
              {thumbnail ? (
                <Image
                  src={thumbnail.url}
                  alt={title}
                  fill
                  sizes="(max-width: 500px) 100px"
                  className={`object-cover rounded-t-md ${
                    isAdmin && "hover:brightness-75"
                  }`}
                />
              ) : (
                <LoadPage />
              )}
            </div>
          </div>

          <div className="flex flex-col !mt-0 gap-3 px-4 py-3 justify-between overflow-hidden">
            <h3 className="font-bold text-xl capitalize">{title}</h3>
            {item.stock > 0 ? (
              <p>{formatToEuroCurrency(price)}</p>
            ) : (
              <p className="uppercase font-bold">{t("soldOut")}</p>
            )}
          </div>
        </Link>
      </div>
    );
  }
};

export default Merchandise;
