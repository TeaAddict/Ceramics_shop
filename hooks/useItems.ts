import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
  const res = useQuery<ProductSchema[]>({
    queryKey: ["items"],
    queryFn: () =>
      fetch("/api/shop", { method: "GET" }).then((res) => res.json()),
  });

  const isMissing = res.data?.find((item) => item.thumbnail === null);
  if (isMissing) {
    res.refetch();
  }
  return res;
}
