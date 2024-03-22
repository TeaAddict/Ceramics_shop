"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MerchandiseCard from "@/components/cards/Merchandise";
import { useItems } from "@/hooks/useItems";
import { sortItems } from "@/utils/item/sortItems";
import { useTranslation } from "@/app/i18n/client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const CarouselSection = ({
  sortBy,
  isSoldDisplayed,
  lng,
}: {
  sortBy: string | undefined;
  isSoldDisplayed: boolean | undefined;
  lng: string;
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { t } = useTranslation(lng, "home");
  const { data } = useItems();
  if (!data || data?.length === 0 || !sortBy) return;

  const sortedData = sortItems(data, sortBy);

  const nonSoldItems = sortedData.filter((item) => {
    if (isSoldDisplayed) {
      return item;
    } else if (!isSoldDisplayed && item.stock > 0) {
      return item;
    }
  });

  const items = nonSoldItems.slice(0, 6);

  return (
    <article className="my-10 flex justify-center">
      <div className="flex flex-col px-14 sm:px-20 md:px-20 lg:px-0 w-full max-w-3xl gap-5">
        <h2 className="text-2xl font-semibold">{t("carouselSection.h1")}</h2>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {items &&
              items.map((item, index) => (
                <CarouselItem key={index} className="xs:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <MerchandiseCard
                      isAdmin={false}
                      item={item}
                      href={`/shop/${item.id}`}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      thumbnail={{
                        name: item.thumbnail.name,
                        width: item.thumbnail.width,
                        height: item.thumbnail.height,
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </article>
  );
};

export default CarouselSection;
