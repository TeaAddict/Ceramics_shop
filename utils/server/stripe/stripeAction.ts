"use server";

import { Cart } from "@/lib/types";
import { convertDbItemToMap } from "../../functions/convertDbItemToMap";
import { convertToCartItem } from "../../functions/convertToCartItem";
import { getItems } from "../getItems";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type CartItem = { id: string; quantity: number };
type CartItems = CartItem[];

export async function stripeAction(cart: Cart): Promise<string> {
  try {
    const itemsInDb = await getItems();
    const storeItems = convertDbItemToMap(itemsInDb);
    const cartItems: CartItems = convertToCartItem(cart);

    console.log(storeItems, "store items");
    console.log(cartItems, "cart items");

    let session = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.SERVER_URL}/payment/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SERVER_URL}/payment/cancel`,
      // customer_email: order.email,
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["LT"],
      },
    });

    return session.url;
  } catch (error: any) {
    console.log(`Error creating payment link ${error.message}`);
    return error.message;
  }
}
