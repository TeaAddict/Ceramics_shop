import { TOrderSchema } from "@/lib/types";

export function convertToCartItem(cart: TOrderSchema["cart"]) {
  const res = cart.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });
  return res;
}
