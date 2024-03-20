import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Properties = {
  name: string;
  value: string;
}[];

// export function useUpdateSearchParams(value: string, name = "sortBy") {
export function useUpdateSearchParams(list?: Properties) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [lastParams, setLastParams] = useState(list);

  useEffect(() => {
    if (lastParams) {
      const params = new URLSearchParams(searchParams);
      lastParams.forEach((val) => params.set(val.name, val.value));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [lastParams, pathname, router, searchParams]);
  return { lastParams, setLastParams };
}
