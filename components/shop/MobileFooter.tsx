import React from "react";
import { FaFilter } from "react-icons/fa";

import { FaSortAlphaUpAlt } from "react-icons/fa";
import MobileCartBadge from "./MobileCartBadge";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 bg-accent/75 w-full grid grid-cols-3 py-3 items-center">
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <FaFilter className="text-foreground" size={18} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <FaSortAlphaUpAlt className="text-foreground" size={25} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
          <MobileCartBadge value={0} />
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
