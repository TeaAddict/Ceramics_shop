import React from "react";
import { FaFilter } from "react-icons/fa";

import { FaSortAlphaUpAlt } from "react-icons/fa";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 bg-accent/75 w-full justify-around flex py-3 items-center">
      <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
        <FaFilter className="text-foreground" size={18} />
      </div>
      <div className="bg-primary/75 rounded-full w-10 h-10 justify-center flex items-center">
        <FaSortAlphaUpAlt className="text-foreground" size={30} />
      </div>
    </div>
  );
};

export default MobileFooter;
