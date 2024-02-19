import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
  const res = useQuery<ProductSchema[]>({
    queryKey: ["items"],
    queryFn: () =>
      fetch("/api/shop", { method: "GET" }).then((res) => res.json()),
  });

  return res;
}
