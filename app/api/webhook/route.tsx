import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { updateDb } from "@/utils/server/stripe/updateDb";
import { PaymentData, SoldItem } from "@/utils/types/stripe";
import { mapSoldItems } from "@/utils/functions/mapSoldItems";
import { createTransaction } from "@/utils/server/stripe/createTransaction";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get("stripe-signature") || "";

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error) {
      console.log(`Webhook signature verification failed.`, error);
      return NextResponse.json({ received: false }, { status: 400 });
    }

    console.log(event.type, "EVENT TYPE");
    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items", "line_items.data.price.product"] }
      );

      const lineItems = sessionWithLineItems.line_items?.data;
      if (!lineItems) {
        console.log("No line items found in the session.");
        return NextResponse.json({ status: 500 });
      }
      try {
        const transaction = createTransaction(event);

        // filters properties
        const soldItems: SoldItem[] = mapSoldItems(lineItems);

        const dataForDb: PaymentData = { ...transaction, soldItems };
        await updateDb(dataForDb);
      } catch (error) {
        console.log("Unable to save order", error);
        return NextResponse.json({ received: false }, { status: 500 });
      }
    } else {
      console.log(`Checkout status NOT "completed"`, event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log("Error in POST function:", error);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
