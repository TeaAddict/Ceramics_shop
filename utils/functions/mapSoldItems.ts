import Stripe from "stripe";
import { SoldItem } from "../types/stripe";

export function mapSoldItems(lineItems: Stripe.LineItem[]) {
  const soldItems: SoldItem[] = lineItems
    .map((item) => {
      if (
        item &&
        item.price?.product &&
        typeof item.price.product === "object" &&
        "metadata" in item.price.product
      ) {
        if (item.price?.unit_amount) {
          const parsedItem = {
            amountDiscount: item.amount_discount,
            amountTax: item.amount_tax,
            amountSubtotal: item.amount_subtotal,
            amountTotal: item.amount_total,
            unitAmount: item.price.unit_amount,
            quantity: item.quantity,
            name: item.description,
            itemId: item.price.product.metadata.itemId,
          };
          return parsedItem;
        }
      }
    })
    .filter((item): item is SoldItem => item !== undefined);
  return soldItems;
}
