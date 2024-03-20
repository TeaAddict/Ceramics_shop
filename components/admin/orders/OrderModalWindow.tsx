import React from "react";
import { TableOrder } from "./OrdersTable";
import { SelectCn } from "@/components/shared/SelectCn";
import ProductTable from "@/components/order/ProductTable";
import { soldItemToProduct } from "@/utils/orderFunctions/soldItemToProduct";
import { updateStatus } from "@/utils/server/order/updateStatus";
import { formatCentsToEuroCurrency } from "@/utils/helper";
import toast from "react-hot-toast";
import { useTranslation } from "@/app/i18n/client";
import { translateStatusOptions } from "@/utils/functions/translateStatusOptions";

const OrderModalWindow = ({ row, lng }: { row: TableOrder; lng: string }) => {
  const product = soldItemToProduct(row.soldItems);
  const { t } = useTranslation(lng, "admin");
  const translatedOptions = translateStatusOptions(t);

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <p>{t("orderId")}</p>
          <p>{row.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <p>{t("shippingStatus")}</p>
          <SelectCn
            initialSelection={row.status}
            selectOptions={translatedOptions}
            onChange={async (e) => {
              toast.promise(updateStatus(row.id, e), {
                loading: "Saving...",
                success: <b>Settings saved!</b>,
                error: <b>Could not save.</b>,
              });
            }}
          />
        </div>
        <div className="flex gap-3">
          <p>{t("totalAmount")}</p>
          <p>{formatCentsToEuroCurrency(row.amountTotal)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3>{t("products")}</h3>
          <ProductTable data={product} lng={lng} />
        </div>
      </div>
    </div>
  );
};

export default OrderModalWindow;
