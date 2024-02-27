import React from "react";
import { MobileSortByModal } from "./MobileSortByModal";
import { MobileFilterByModal } from "./MobileFilterByModal";
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
    <div className="fixed bottom-0 left-0 bg-white/90 w-full grid grid-cols-2 py-3 items-center">
      <div className="flex justify-center">
        <div className="w-10 h-10 justify-center flex items-center">
          <MobileFilterByModal categories={categories} filterBy={filterBy} />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-10 h-10 justify-center flex items-center">
          <MobileSortByModal sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
