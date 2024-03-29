"use server";

import { Cart } from "@/lib/types";
import { convertDbItemToMap } from "../../functions/convertDbItemToMap";
import { convertToCartItem } from "../../functions/convertToCartItem";
import { getItems } from "../getItems";
import { ItemSimple } from "@/prisma/prismaTypes";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type CartItem = { id: string; quantity: number };
type CartItems = CartItem[];

export async function stripeAction(cart: Cart): Promise<string> {
  try {
    const itemsIds = cart.map((item) => item.id);
    const itemsInDb = await getItems(itemsIds);
    if (!itemsInDb.every((val) => val !== null))
      throw new Error("Some of the items do not exist");
    const storeItems = convertDbItemToMap(itemsInDb as ItemSimple[]);
    const cartItems: CartItems = convertToCartItem(cart);

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
