"use server";

import BackButton from "@/components/shared/BackButton";
import { Session } from "next-auth";
import ItemCartInterface from "../cart/ItemCartInterface";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { getItem } from "@/utils/server/getItem";
import { ImageShowcase } from "./photo/ImageShowcase";
import { useTranslation } from "@/app/i18n";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";

const ItemWindow = async ({
  params,
  session,
}: {
  params: { id: string; lng: string };
  session: Session | null;
}) => {
  const { t } = await useTranslation(params.lng, "shop");
  const item = await getItem(params.id);
  const settings = await getGeneralSettings();

  if (!item || Object.keys(item).length === 0)
    return <CustomReturnMessage text="Product does not exist" />;
  if (!settings)
    return <CustomReturnMessage text="Missing settings" backButton={false} />;

  return (
    <section className="flex flex-col gap-5">
      <BackButton />
      <div className="flex flex-col md:flex-row md:justify-center gap-5  lg:justify-evenly">
        <div className="flex gap-3 md:hidden">
          <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
        </div>
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
          <ImageShowcase
            thumbnailName={item.thumbnail?.name ?? ""}
            images={item.pictures}
            galleryID="image-showcase"
            autoplay={true}
          />
        </div>
        <div className="flex flex-col gap-5 min-w-44">
          <div className="hidden md:flex gap-3">
            <h3 className="font-semibold text-3xl capitalize">{item.title}</h3>
          </div>

          <div>
            {item.stock > 1 && (
              <ItemCartInterface
                item={item}
                params={params}
                isOnline={settings.paymentOnline}
              />
            )}
            {!settings.paymentOnline && item.stock > 1 && (
              <p>Currently in stock: {item.stock}</p>
            )}
          </div>

          {item.stock < 1 && (
            <p className="text-2xl text-destructive">{t("itemIsSoldOut")}</p>
          )}

          {item.description && (
            <div>
              <h3>{t("description")}</h3>
              <p className="md:max-w-72 whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemWindow;
