import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
  const res = useQuery<ProductSchema[]>({
    queryKey: ["items"],
    queryFn: () =>
      fetch("/api/item", { method: "GET" }).then((res) => res.json()),
  });

  return res;
  // if (!res.data) return res;

  // const filtered = res.data.filter(
  //   (item) => item.category === searchParams.category
  // );

  // const sorted = filtered.sort((a, b) => {
  //   if (sort[1] === "asc") {
  //     return a[sort[0] as keyof TSort] - b[sort[0] as keyof TSort];
  //   } else {
  //     return b[sort[0] as keyof TSort] - a[sort[0] as keyof TSort];
  //   }
  // });

  // return { ...res, data: sorted };
}
