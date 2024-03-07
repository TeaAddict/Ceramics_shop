import { ProductSchema } from "@/lib/types";

type TSort = {
  price: number;
};

export function sortItems(items: ProductSchema[], sortBy: string) {
  const sort = sortBy.split("-");

  const sorted = items.sort((a, b) => {
    if (sort[0] === "date") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sort[1] === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    if (sort[1] === "asc") {
      return a[sort[0] as keyof TSort] - b[sort[0] as keyof TSort];
    } else {
      return b[sort[0] as keyof TSort] - a[sort[0] as keyof TSort];
    }
  });
  return sorted;
}
