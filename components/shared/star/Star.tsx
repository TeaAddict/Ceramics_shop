import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Star = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative text-4xl inline-block cursor-pointer"
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <div className="absolute text-gray-200 ">
        <FaRegStar />
      </div>
      <div className={`absolute ${!isActive && "opacity-0"}  text-yellow-400`}>
        <FaStar />
      </div>
    </div>
  );
};

export default Star;
