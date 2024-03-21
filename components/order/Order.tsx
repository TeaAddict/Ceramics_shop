"use server";

import { TransactionFull } from "@/prisma/prismaTypes";
import { parseDate } from "@/utils/functions/parseDate";
import ProductTable, { Product } from "./ProductTable";
import { formatCentsToEuroCurrency } from "@/utils/helper";
import { useTranslation } from "@/app/i18n";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = async ({
  params,
  data,
}: {
  params: { sessionId: string; lng: string };
  data: TransactionFull;
}) => {
  const { t } = await useTranslation(params.lng, "shop");
  const createdAtClean = parseDate(data.createdAt);
  const address = data.customerDetails.address;

  const cartItem: Product[] = data.soldItems.map((item) => {
    return {
      id: item.itemId ?? "",
      title: item.name,
      picture: item.item?.thumbnail?.name!,
      quantity: item.quantity ?? 0,
      unitPrice: item.unitAmount,
      totalPrice: item.amountTotal,
    };
  });
  return (
    <div className="flex flex-col gap-7">
      <div>
        <p>{t("orderSuccess.orderId")}</p>
        <p>{data.orderId}</p>
        <p>{t("orderSuccess.orderDate")}</p>
        <p>{createdAtClean}</p>
      </div>
      <div>
        <h3>{t("orderSuccess.shippingInformation")}</h3>
        <div className="grid grid-cols-2">
          <p>{t("orderSuccess.country")}</p>
          <p>{address.country}</p>
          <p>{t("orderSuccess.state")}</p>
          <p>{address.state}</p>
          <p>{t("orderSuccess.city")}</p>
          <p>{address.city}</p>
          <p>{t("orderSuccess.address")}</p>
          <div>
            <p>{address.line1}</p>
            <p>{address.line2}</p>
          </div>
          <p>{t("orderSuccess.postalCode")}</p>
          <p>{address.postal_code}</p>
        </div>
      </div>
      <div>
        <h3>{t("orderSuccess.product")}</h3>
        <div>
          <ProductTable lng={params.lng} data={cartItem} />
        </div>
      </div>
      <div>
        <h3>{t("orderSuccess.billingDetails")}</h3>
        <div className="grid grid-cols-2">
          <p>{t("orderSuccess.amount")}</p>
          <p>{formatCentsToEuroCurrency(data.amountTotal || 0)}</p>
          <p>{t("orderSuccess.country")}</p>
          <p>{address.country}</p>
          <p>{t("orderSuccess.state")}</p>
          <p>{address.state}</p>
          <p>{t("orderSuccess.city")}</p>
          <p>{address.city}</p>
          <p>{t("orderSuccess.address")}</p>
          <div>
            <p>{address.line1}</p>
            <p>{address.line2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
