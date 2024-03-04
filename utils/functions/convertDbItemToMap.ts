import { Item } from "@prisma/client";

// {
//     id: '43856d47-9af2-498f-bd8a-1964cf1e9f6e',
//     title: 'rrrrrrrr',
//     price: 1,
//     stock: 5,
//     category: 'rrr',
//     description: 'asdasdasaccccccc\r\n' +
//       'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
//     thumbnailId: '9a0bcd85-b17e-4899-8909-a8740a562e86',
//     createdAt: 2024-02-25T19:25:53.440Z
//   },

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Vase1" }],
  [2, { priceInCents: 2000, name: "Vase2" }],
]);

export function convertDbItemToMap(items: Item[]) {
  let storedItems = new Map();
  items.forEach((item) => {
    const priceCents = item.price * 100;
    storedItems.set(item.id, { priceInCents: priceCents, name: item.title });
  });
  return storedItems;
}
