"use client";

import { useEffect, useState } from "react";

const VerticalMenu = ({
  menuList,
  activeValue,
  onClick,
  color = "default",
}: {
  menuList: { label: string; value: number }[];
  activeValue: string;
  onClick: Function;
  color?: "default" | "inverted";
}) => {
  const [active, setActive] = useState(activeValue);

  function handleClick(key: string) {
    setActive(key);
    onClick(key);
  }

  useEffect(() => {
    setActive(activeValue);
  }, [activeValue]);

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
            {item.value > 0 && (
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
