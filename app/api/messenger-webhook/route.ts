//@ts-nocheck

import { getOrderByRef } from "@/lib/queries/orders";
import { formatPrice } from "@/lib/utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (!process.env.MESSENGER_VERIFY_TOKEN)
    throw new Error("MESSENGER_VERIFY_TOKEN env is not defined");

  const searchParams = req.nextUrl.searchParams;

  // Parse the query params
  let mode = searchParams.get("hub.mode");
  let token = searchParams.get("hub.verify_token");
  let challenge = searchParams.get("hub.challenge");

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.MESSENGER_VERIFY_TOKEN) {
      // Respond with the challenge token from the request

      return new Response(challenge, {
        status: 200,
      });
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match

      return new Response("Invalid verify token", {
        status: 403,
      });
    }
  }
}

export async function POST(request: Request) {
  try {
    const text = await request.text();

    console.log(JSON.parse(text).entry[0].messaging[0]);
    const {
      sender: recipient,
      optin,
      message,
    } = JSON.parse(text).entry[0].messaging[0];

    const orderRef = optin?.ref;
    const quickReply = message?.quick_reply;

    if (orderRef) {
      console.log("ORDER OPTIN");
      setTimeout(async () => {
        const order = await getOrderByRef(orderRef);

        const items = order?.items.map((item) => ({
          title: item.name,
          subtitle: `Milk: Regular; Request: Nothing, I'm good!`,
          quantity: item.quantity,
          currency: "PHP",
          price: item.price,
          image_url: "http://originalcoastclothing.com/img/whiteshirt.png",
        }));

        const template = {
          attachment: {
            type: "template",
            payload: {
              template_type: "receipt",
              recipient_name: order?.customer_name,
              order_number: order?.id,
              currency: "PHP",
              payment_method: order?.payment_method,
              order_url: "http://luna-latte.vercel.app",
              timestamp: parseInt(new Date(order?.created_at).getTime() / 1000),
              summary: {
                subtotal: order?.total_price,
                shipping_cost: 50,
                total_cost: order?.total_price + 50,
              },
              // adjustments: [
              //   {
              //     name: "New Customer Discount",
              //     amount: 20,
              //   },
              //   {
              //     name: "$10 Off Coupon",
              //     amount: 10,
              //   },
              // ],
              elements: items,
            },
          },
        };

        const message = {
          text: `Hello ${
            order?.customer_name
          }! Pa confirm na lang po ng order details para ma-book po namin thru Lalamove yung order niyo : )

Delivery details:
Name: ${order?.customer_name}
Address : ${order?.delivery_address}
Nearest land mark: ${order?.landmark}

Orders: 
${order?.items.map(
  (item) => `- ${item.name} (${formatPrice(item.price)} | x${item.quantity})\n`
)}

Subtotal: ${formatPrice(order?.total_price)}
Payment option: ${order?.payment_method}
`,
          quick_replies: [
            {
              content_type: "text",
              title: "Confirm",
              payload: orderRef,
              // image_url: "",
            },
          ],
        };

        const response = await (
          await fetch(
            `https://graph.facebook.com/v18.0/155078761029891/messages?recipient={'id': ${
              recipient.id
            }}&messaging_type=UPDATE&message=${JSON.stringify(
              message
            )}&access_token=${process.env.PAGES_ACCESS_TOKEN}`,
            {
              method: "POST",
            }
          )
        ).json();

        console.log("RES: ", response);

        return new Response("Order confirmation sent to customer!", {
          status: 200,
        });
      }, 2000);
    }

    if (quickReply) {
      const orderRef = quickReply.payload;

      const headersList = headers();

      const host = headersList.get("host");

      console.log(`${host}/gcash-QRs/89.png`);

      console.log(`SET THE STATUS OF THIS ORDER - ${orderRef} to "CONFIRMED"`);
      // prisma?.order.update({
      //   where: {
      //     ref: orderRef,
      //   },
      //   data: {
      //     status:
      //   }
      // });
    }
    // Process the webhook payload
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
