"use server";
import React from "react";
import Star from "./Star";
import { isFavourited } from "@/utils/server/favourite";

const FavStar = async ({ itemId }: { itemId: string }) => {
  const isFavourite = !!(await isFavourited(itemId));
  return (
    <>
      <Star itemId={itemId} isFavourite={isFavourite} />
    </>
  );
};

export default FavStar;
