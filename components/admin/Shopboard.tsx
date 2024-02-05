import React from "react";
import ShopWindow from "../shop/ShopWindow";
import MobileFooter from "../shop/MobileFooter";
import AdminMobileFooter from "./AdminMobileFooter";

const Shopboard = () => {
  return (
    <div className="padding-container">
      <ShopWindow color="inverted" isAdmin={true} />
      <div className="sm:hidden">
        {/* TODO might need to use mobile shop footer if I do not change admin footer */}
        <AdminMobileFooter />
      </div>
    </div>
  );
};

export default Shopboard;
