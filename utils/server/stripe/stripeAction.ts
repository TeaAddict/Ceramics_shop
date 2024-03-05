"use server";

import { TOrderSchema } from "@/lib/types";
import { convertDbItemToMap } from "../../functions/convertDbItemToMap";
import { convertToCartItem } from "../../functions/convertToCartItem";
import { getItems } from "../getItems";
import { metadata } from "@/app/(root)/layout";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type CartItem = { id: string; quantity: number };
type CartItems = CartItem[];

export async function stripeAction(order: TOrderSchema): Promise<string> {
  try {
    const itemsInDb = await getItems();
    const storeItems = convertDbItemToMap(itemsInDb);
    const cartItems: CartItems = convertToCartItem(order.cart);

    console.log(storeItems, "store items");
    console.log(cartItems, "cart items");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => {
        const storeItem = storeItems.get(item.id);
        if (storeItem)
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: storeItem.name,
                metadata: {
                  itemId: item.id,
                },
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
      }),
      success_url: `${process.env.SERVER_URL}/payment/success`,
      cancel_url: `${process.env.SERVER_URL}/payment/cancel`,
      customer_email: order.email,
    });
    // console.log(session);
    return session.url;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}
