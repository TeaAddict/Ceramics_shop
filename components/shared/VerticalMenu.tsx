"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VerticalMenu = ({
  menuList,
  pageParam = false,
  paramName,
  color = "default",
}: {
  menuList: { label: string; value?: number }[];
  pageParam?: boolean;
  paramName: string;
  color?: "default" | "inverted";
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParam = searchParams.get(paramName);
  const pathname = usePathname();
  const [active, setActive] = useState(currentParam || menuList[0].label);

  const isStillActive = menuList.find((el) => el.label === active);

  const changeCategoryParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(paramName, value);
      if (pageParam) params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pageParam, paramName, pathname, router, searchParams]
  );

  const handleClick = useCallback(
    (key: string) => {
      setActive(key);
      changeCategoryParam(key);
    },
    [changeCategoryParam]
  );

  useEffect(() => {
    if (!isStillActive) {
      handleClick(menuList[0].label);
    }
  }, [isStillActive, menuList, handleClick]);

  return (
    <ul className="space-y-1">
      {menuList.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => handleClick(item.label)}
            className={
              color === "default"
                ? `group flex items-center justify-between w-full rounded-lg sm:rounded-r-none px-4 py-2 hover:bg-gray-100 ${
                    active === item.label
                      ? "text-foreground bg-gray-100"
                      : "text-gray-500"
                  }`
                : `group flex items-center justify-between w-full rounded-lg sm:rounded-r-none px-4 py-2 hover:bg-background ${
                    active === item.label
                      ? "text-foreground bg-background"
                      : "text-gray-500"
                  }`
            }
          >
            <span className="text-sm font-medium capitalize">{item.label}</span>
            {item.value && item.value > 0 && (
              <span
                className={`shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700 ${
                  active === item.label && "text-foreground bg-gray-200"
                }`}
              >
                {item.value}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default VerticalMenu;
