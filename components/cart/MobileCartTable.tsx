import React, { MouseEventHandler } from "react";
import { CartItem } from "./MyCartTable";
import MobileCartRow from "./MobileCartRow";

const MobileCartTable = ({
  data,
  handleIncrease,
  handleDecrease,
}: {
  data: CartItem[];
  handleIncrease: Function;
  handleDecrease: Function;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mb-3">Your Cart</h2>
      {data.map((row) => (
        <MobileCartRow
          key={row.id}
          id={row.id}
          price={row.unitPrice}
          quantity={row.quantity}
          thumbnailImage={row.picture}
          title={row.title}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      ))}
    </div>
  );
};

export default MobileCartTable;
