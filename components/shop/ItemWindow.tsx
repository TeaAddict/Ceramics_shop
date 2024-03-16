"use server";

import BackButton from "@/components/shared/BackButton";
import { Session } from "next-auth";
import FavStar from "../shared/star/FavStar";
import ItemCartInterface from "../cart/ItemCartInterface";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { getItem } from "@/utils/server/getItem";
import { ImageShowcase } from "./photo/ImageShowcase";

const ItemWindow = async ({
  params,
  session,
}: {
  params: { id: string };
  session: Session | null;
}) => {
  const item = await getItem(params.id);
  type TItem = typeof item;

  if (!item || Object.keys(item).length === 0)
    return <CustomReturnMessage text="Product does not exist" />;

  return (
    <section className="flex flex-col gap-5">
      <BackButton />

      <div className="flex flex-col md:flex-row md:justify-center gap-5  lg:justify-evenly">
        <div className="flex gap-3 md:hidden">
          <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
          {session && <FavStar itemId={item.id} />}
        </div>
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
          <ImageShowcase images={item.pictures} galleryID="image-showcase" />
        </div>
        <div className="flex flex-col gap-10 min-w-44">
          <div className="hidden md:flex gap-3">
            <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
            {session && <FavStar itemId={item.id} />}
          </div>

          {item.stock > 0 ? (
            <ItemCartInterface item={item} params={params} />
          ) : (
            <p className="text-2xl text-destructive">Item is sold out</p>
          )}

          {item.description && (
            <div>
              <h3>Description:</h3>
              <p className="md:max-w-72 capitalize">{item.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemWindow;
