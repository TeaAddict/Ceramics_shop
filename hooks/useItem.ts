import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useItem(id: string) {
  return useQuery<ProductSchema>({
    queryKey: ["item"],
    queryFn: () =>
      fetch(`/api/shop/${id}`, { method: "GET" }).then((res) => res.json()),
  });
}
