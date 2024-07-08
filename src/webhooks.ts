import { Webhookrequest } from "./server";
import express from "express";
import { Resend } from "resend";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import { getPayloadClient } from "./get-payload";
import { Product } from "./payload-types";
import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookrequest = req as any as Webhookrequest;
  const body = webhookrequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    return res
      .status(400)
      .send(
        `webhook error : ${
          error instanceof Error ? error.message : "unknown error"
        }`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return res.status(400).send(`webhook error : no user present in metadata`);
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    if (!user) {
      return res.status(404).json({ error: "no such user exists." });
    }

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    if (!order) {
      return res.status(404).json({ error: "no such order exists." });
    }

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    // send receipt.
    try {
      const data = await resend.emails.send({
        from: "DigitalHippo <thelakshayvaishnav@gmail.com>",
        to: [user.email],
        subject: "Thanks for your order ! this is your receipt.",
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products as Product[],
        }),
      });
    } catch (error) {}
  }
};
