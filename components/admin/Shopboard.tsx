import React from "react";
import ShopWindow from "../shop/ShopWindow";

const Shopboard = () => {
  return (
    <div className="padding-container">
      <ShopWindow color="inverted" isAdmin={true} />
    </div>
  );
};

export default Shopboard;
