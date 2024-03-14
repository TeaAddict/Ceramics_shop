import React from "react";
import { TableOrder } from "./OrdersTable";
import { SelectCn } from "@/components/shared/SelectCn";
import { SHIPPING_STATUS } from "@/constants";
import ProductTable from "@/components/order/ProductTable";
import { soldItemToProduct } from "@/utils/orderFunctions/soldItemToProduct";
import { updateStatus } from "@/utils/server/order/updateStatus";
import { formatCentsToEuroCurrency } from "@/utils/helper";

const OrderModalWindow = ({ row }: { row: TableOrder }) => {
  const product = soldItemToProduct(row.soldItems);

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <p>Order id:</p>
          <p>{row.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Shipping status:</p>
          <SelectCn
            initialSelection={row.status}
            selectOptions={SHIPPING_STATUS}
            onChange={async (e) => {
              await updateStatus(row.id, e);
            }}
          />
        </div>
        <div className="flex gap-3">
          <p>Total amount:</p>
          <p>{formatCentsToEuroCurrency(row.amountTotal)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3>Products:</h3>
          <ProductTable data={product} />
        </div>
      </div>
    </div>
  );
};

export default OrderModalWindow;
