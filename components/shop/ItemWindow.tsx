"use server";

import PhotoSwipeCarousel from "@/components/shop/PhotoSwipeCarousel";
import BackButton from "@/components/shared/BackButton";
import { Session } from "next-auth";
import FavStar from "../shared/star/FavStar";
import ItemCartInterface from "../cart/ItemCartInterface";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { getItem } from "@/utils/server/getItem";
import { formatToEuroCurrency } from "@/utils/helper";
import AddToCartButton from "../cart/AddToCartButton";

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
    return <CustomReturnMessage>Product does not exist</CustomReturnMessage>;

  return (
    <section className="flex flex-col gap-5">
      <BackButton />

      <div className="flex flex-col md:flex-row md:justify-center gap-5 md:gap-52">
        <div className="flex gap-3 md:hidden">
          <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
          {session && <FavStar itemId={item.id} />}
        </div>
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
          <PhotoSwipeCarousel
            galleryID="testing"
            images={item.pictures.map((image) => {
              return {
                largeURL: image.name,
                thumbnailURL: image.name,
                width: image.width,
                height: image.height,
              };
            })}
          />
          <p className="hidden md:block">===IDK SOME FANCY IMAGE SLIDE===</p>
        </div>
        <div className="flex flex-col gap-10 min-w-44">
          <div className="hidden md:flex gap-3">
            <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
            {session && <FavStar itemId={item.id} />}
          </div>

          <ItemCartInterface item={item} params={params} />

          {item.description && (
            <p className="md:max-w-72 capitalize">{item.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemWindow;
