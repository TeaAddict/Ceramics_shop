import { Product } from "@/components/order/ProductTable";
import { SoldItemType } from "@/prisma/prismaTypes";

// soldItems: {
//     id: string;
//     name: string;
//     quantity: number | null;
//     amountSubtotal: number;
//     amountTotal: number;
//     amountDiscount: number;
//     amountTax: number;
//     unitAmount: number;
//     createdAt: Date;
//     transactionId: string;
//     itemId: string;

export function soldItemToProduct(data: SoldItemType[]): Product[] {
  return data.map((item) => {
    return {
      id: item.itemId,
      title: item.name,
      picture: item.item.thumbnail?.name!,
      quantity: item.quantity || 0,
      unitPrice: item.unitAmount,
      totalPrice: item.amountTotal,
    };
  });
}
