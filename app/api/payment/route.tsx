import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    console.log(rawBody);

    const sig = request.headers.get("stripe-signature") || "";

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return NextResponse.json({ received: false }, { status: 400 });
    }
    console.log("event.type", JSON.stringify(event.type));
    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items"] }
      );
      const lineItems = sessionWithLineItems.line_items;
      if (!lineItems) return NextResponse.json({ status: 500 });
      try {
        console.log(
          event,
          "EVENTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
        );
        console.log(event.data.object.total_details, "total details");
        const sessionInfo = event.data.object;
        const importantInfo = {
          payment_status: sessionInfo.payment_status,
          status: sessionInfo.status,
          //   invoice_creation: sessionInfo.invoice_creation,
          customer_details: sessionInfo.customer_details,
          currency: sessionInfo.currency,
          //   automatic_tax: sessionInfo.automatic_tax,
          amount_subtotal: sessionInfo.amount_subtotal,
          amount_total: sessionInfo.amount_total,
        };

        const parsedItems = lineItems.data.map((item) => {
          if (item.price?.unit_amount) {
            const parsedItem = {
              amount_discount: item.amount_discount,
              amount_tax: item.amount_tax,
              amount_subtotal: item.amount_subtotal,
              amount_total: item.amount_total,
              unit_amount: item.price.unit_amount,
              quantity: item.quantity,
              description: item.description,
            };
            return parsedItem;
          }
        });
        console.log(parsedItems);
        console.log(importantInfo);
      } catch (error: any) {
        console.log("Unable to save order");
        return NextResponse.json({ received: false }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e) {
    console.log("Error in POST function:", e);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
