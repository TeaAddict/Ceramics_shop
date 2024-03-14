import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useUpdateSearchParams(value: string, name = "sortBy") {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [paramValue, setParamValue] = useState(value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(name, paramValue);
    router.replace(`${pathname}?${params.toString()}`);
  }, [name, paramValue, pathname, router, searchParams]);
  return { paramValue, setParamValue };
}
