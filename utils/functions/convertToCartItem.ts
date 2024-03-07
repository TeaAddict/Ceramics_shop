import { Cart } from "@/lib/types";

export function convertToCartItem(cart: Cart) {
  const res = cart.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });
  return res;
}
