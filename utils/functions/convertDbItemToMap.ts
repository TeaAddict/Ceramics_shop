import { Item } from "@prisma/client";

type StoreItems = {
  priceInCents: number;
  name: string;
};

export function convertDbItemToMap(items: Item[]) {
  let storedItems = new Map<string, StoreItems>();
  items.forEach((item) => {
    const priceCents = Math.trunc(item.price * 100);
    storedItems.set(item.id, { priceInCents: priceCents, name: item.title });
  });
  return storedItems;
}
