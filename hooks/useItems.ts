import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
  const res = useQuery<ProductSchema[]>({
    queryKey: ["items"],
    queryFn: () =>
      fetch("/api/shop", { method: "GET" }).then((res) => res.json()),
  });

  // TODO: for some reason thumbnail is missing on first fetch
  // solution?: somehow on prisma assign picture to thumbnail on creation
  // and make thumbnail required in model
  const isMissing = res.data?.find((item) => item.thumbnail === null);
  if (isMissing) {
    res.refetch();
  }
  return res;
}
