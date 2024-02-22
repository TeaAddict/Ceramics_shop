import React from "react";
import { NewItemModal } from "../admin/NewItemModal";

const OutOfStockPage = () => {
  return (
    <div className="padding-container flex flex-col justify-center items-center gap-10">
      <p className="text-2xl">Currently shop is out of items</p>
      <NewItemModal />
    </div>
  );
};

export default OutOfStockPage;
