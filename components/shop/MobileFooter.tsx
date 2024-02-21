"use client";
import React from "react";
import CartBadge from "../shared/header/CartBadge";
import { MobileSortByModal } from "./MobileSortByModal";
import { MobileFilterByModal } from "./MobileFilterByModal";
import { useSearchParams } from "next/navigation";
import { sortOptions } from "@/constants";

const MobileFooter = ({
  categories,
  searchParams,
}: {
  categories: string[];
  searchParams: { category: string; sortBy: string };
}) => {
  const sortBy = searchParams["sortBy"] ?? sortOptions[0].value;
  const filterBy = searchParams["category"] ?? categories[0];

  return (
    <div className="fixed bottom-0 left-0 bg-white/90 w-full grid grid-cols-3 py-3 items-center">
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <MobileFilterByModal categories={categories} filterBy={filterBy} />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <MobileSortByModal sortBy={sortBy} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <CartBadge size="small" />
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
