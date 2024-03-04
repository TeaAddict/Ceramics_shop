"use client";
import { addFavourite, removeFavourite } from "@/utils/server/favourite";
import { Session } from "next-auth";
import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Star = ({
  itemId,
  isFavourite,
}: {
  itemId: string;
  isFavourite: boolean;
}) => {
  const [isActive, setIsActive] = useState(isFavourite);

  async function handleClick() {
    if (!isActive) {
      await addFavourite(itemId);
    } else {
      await removeFavourite(itemId);
    }

    setIsActive((isActive) => !isActive);
  }
  return (
    <div
      className="relative text-4xl inline-block cursor-pointer"
      onClick={handleClick}
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
