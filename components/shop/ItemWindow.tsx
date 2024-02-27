"use client";

import PhotoSwipeCarousel from "@/components/shop/PhotoSwipeCarousel";
import { useItem } from "@/hooks/useItem";
import BackButton from "@/components/shared/BackButton";
import { Session } from "next-auth";
import FavStar from "../shared/star/Star";
import ItemCartInterface from "./ItemCartInterface";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import LoadPage from "../shared/loadSpinner/LoadPage";

const ItemWindow = ({
  params,
  session,
}: {
  params: { id: string };
  session: Session | null;
}) => {
  const { data: item, isLoading } = useItem(params.id);

  if (isLoading) return <LoadPage />;
  if (!item || Object.keys(item).length === 0)
    return <CustomReturnMessage>Product does not exist</CustomReturnMessage>;

  return (
    <section className="flex flex-col gap-5">
      <BackButton />

      <div className="flex flex-col md:flex-row md:justify-center gap-5 md:gap-52">
        <div className="flex gap-3 md:hidden">
          <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
          {session && <FavStar />}
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
        <div className="flex flex-col gap-10">
          <div className="hidden md:flex gap-3">
            <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
            {session && <FavStar />}
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
