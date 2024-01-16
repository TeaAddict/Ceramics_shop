"use client";

import { capitalizeFirstLetter } from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerticalMenu = ({
  menuList,
}: {
  menuList: { [key: string]: number };
}) => {
  const menuKeys = Object.keys(menuList);
  const [filter, setFilter] = useState(menuKeys[0]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, filter]);

  function handleClick(key: string) {
    setFilter(key);
  }

  return (
    <ul className="space-y-1">
      {Object.entries(menuList).map(([key, value]) => (
        <li key={key}>
          <button
            onClick={() => handleClick(key)}
            className={`group flex items-center justify-between w-full rounded-lg rounded-r-none px-4 py-2 hover:bg-gray-100 ${
              filter === key ? "text-gray-700 bg-gray-100" : "text-gray-500"
            }`}
          >
            <span className="text-sm font-medium">
              {capitalizeFirstLetter(key)}
            </span>
            {value > 0 && (
              <span
                className={`shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700 ${
                  filter === key && "text-gray-700 bg-gray-200"
                }`}
              >
                {value}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default VerticalMenu;
