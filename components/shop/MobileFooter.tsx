"use client";
import React from "react";
import { FaFilter } from "react-icons/fa";

import { FaSortAlphaUpAlt } from "react-icons/fa";
import CartBadge from "../shared/header/CartBadge";
import { MobileSortByModal } from "./MobileSortByModal";
import { MobileFilterByModal } from "./MobileFilterByModal";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 bg-accent/75 w-full grid grid-cols-3 py-3 items-center">
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <MobileFilterByModal />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <MobileSortByModal />
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
