//@ts-nocheck

import { getOrderByRef, updateOrderStatus } from "@/lib/queries/orders";
import { Message, formatDate, formatPrice, sendMessageApi } from "@/lib/utils";
import { redirect } from "next/dist/server/api-utils";
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
      postback,
    } = JSON.parse(text).entry[0].messaging[0];

    const orderRef = optin?.ref;
    const quickReply = message?.quick_reply;

    const typingOn = async () => {
      const res = await sendMessageApi({
        sender_action: "typing_on",
        recipientId: recipient.id,
      });

      console.log("SENDER ACTION RES: ", res);
    };

    const typingOff = async () => {
      const res = await sendMessageApi({
        sender_action: "typing_off",
        recipientId: recipient.id,
      });

      console.log("SENDER ACTION RES: ", res);
    };

    const sendMenu = async () => {
      await typingOn();

      const imageUrl = `https://www.luna-latte.cafe/menu.png`;

      const sendAttachmentResponse = await sendMessageApi({
        message: {
          attachment: {
            type: "image",
            payload: { url: imageUrl, is_reusable: true },
          },
        },
        messagingType: "RESPONSE",
        recipientId: recipient.id,
      });
      console.log("SEND ATTACHMENT RES: ", sendAttachmentResponse);

      const sendOrderButtonResponse = await sendMessageApi({
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: "Don't limit yourself with what you see on our menu. You can also customize your coffee to match your personal taste 👌",
              buttons: [
                {
                  type: "web_url",
                  url: `https://de18-136-158-11-115.ngrok-free.app/?recipient_id=${recipient.id}`,
                  title: "ORDER NOW",
                  webview_height_ratio: "full",
                  messenger_extensions: true,
                },
              ],
            },
          },
        },
        messagingType: "RESPONSE",
        recipientId: recipient.id,
      });
      console.log("SEND TEXT RES: ", sendOrderButtonResponse);

      await typingOff();

      return new Response("Menu sent!", {
        status: 200,
      });
    };

    if (message?.text === "Can I see  your menu?") {
      sendMenu();
    }

    if (orderRef) {
      console.log("GET STARTED");

      const sendTextResponse = await sendMessageApi({
        message: {
          text: "Hi ka-Luna! 👋 Start sending a message or click something from the menu to start the interaction",
        },
        messagingType: "RESPONSE",
        recipientId: recipient.id,
      });

      console.log("SENT TEXT RES: ", sendTextResponse);

      //       setTimeout(async () => {
      //         try {
      //           const order = await getOrderByRef(orderRef);

      //           if (!order)
      //             throw new Error(`Can't find the order with a ref of: ${orderRef}`);

      //           const message: Message = {
      //             text: `Hello ${
      //               order.customer_name
      //             }! Pa confirm na lang po ng order details, to proceed sa order niyo.

      // Delivery details:
      // Name: ${order.customer_name}
      // Address : ${order.delivery_address}
      // Nearest land mark: ${order.landmark}

      // Orders:
      // ${order.items.map(
      //   (item) =>
      //     `- ${item.name} (${formatPrice(
      //       item.price + (item.milk_additional_price || 0)
      //     )} | x${item.quantity})\n`
      // )}

      // Subtotal: ${formatPrice(order.total_price)} + (Shipping Fee)
      // Payment option: ${order.payment_method}
      // `,
      //             quick_replies: [
      //               {
      //                 content_type: "text",
      //                 title: "Confirm",
      //                 payload: orderRef,
      //                 // image_url: "",
      //               },
      //             ],
      //           };

      //           const response = await sendMessageApi({
      //             message,
      //             messagingType: "UPDATE",
      //             recipientId: recipient.id,
      //           });

      //           console.log("RES: ", response);

      //           return new Response("Order confirmation sent to customer!", {
      //             status: 200,
      //           });
      //         } catch (error) {
      //           console.error(error);
      //           return new Response(`${error.message}`, {
      //             status: 500,
      //           });
      //         }
      //       }, 2000);
    }

    if (quickReply) {
      const orderRef = quickReply.payload;

      if (message.text === "Confirm") {
        // const headersList = headers();
        // const host = headersList.get("host");
        const order = await getOrderByRef(orderRef);

        await updateOrderStatus(order.ref, "WAITING_FOR_PAYMENT");

        const sendPaymentInstruction = async () => {
          const sendTextResponse = await sendMessageApi({
            message: {
              text: `Order confirmed. Pa-send na lang po ng payment and we will prepare your order right after.

‼Strictly no COD transactions‼️

${
  order?.payment_method === "GCASH" &&
  `Gcash
0909 195 7066`
} 
`,
            },
            messagingType: "RESPONSE",
            recipientId: recipient.id,
          });
          console.log("SEND TEXT RES: ", sendTextResponse);
        };
        const sendGcashQR = async () => {
          const imageUrl = `https://www.luna-latte.cafe/gcash-QRs/luna-latte.png`;

          const sendAttachmentResponse = await sendMessageApi({
            message: {
              attachment: {
                type: "image",
                payload: { url: imageUrl, is_reusable: false },
              },
              quick_replies: [
                {
                  content_type: "text",
                  title: "Payment sent",
                  payload: orderRef,
                  // image_url: "",
                },
              ],
            },
            messagingType: "RESPONSE",
            recipientId: recipient.id,
          });

          console.log("SEND ATTACHMENT RES: ", sendAttachmentResponse);
        };

        await sendPaymentInstruction();
        if (order?.payment_method === "GCASH") await sendGcashQR();

        return new Response("Payment option sent to customer!", {
          status: 200,
        });
      }

      if (message.text === "Payment sent") {
        await sendMessageApi({
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                text: `Thank you sa suporta Gar! 
Sit back and relax lang while we prepare your order. Meanwhile, you can track your order by clicking the button below : )
`,
                buttons: [
                  {
                    type: "postback",
                    title: "Track my order",
                    payload: orderRef,
                  },
                ],
              },
            },
          },
          messagingType: "RESPONSE",
          recipientId: recipient.id,
        });

        return new Response(
          "Payment sent by a customer needs to be confirmed!",
          {
            status: 200,
          }
        );
      }
    }

    if (postback) {
      const orderRef = postback.payload;

      if (postback.title === "Track my order") {
        const order = await getOrderByRef(orderRef);

        const sendTextResponse = await sendMessageApi({
          message: {
            text: `Order ID: ${order.id}
Placed at: ${formatDate(order?.created_at)}
Status: ${order.status}

Orders: 
${order.items.map(
  (item) => `- ${item.name} (${formatPrice(item.price)} | x${item.quantity})\n`
)}
`,
            quick_replies: [
              {
                content_type: "text",
                title: "Track my order",
                payload: orderRef,
                // image_url: "",
              },
            ],
          },
          messagingType: "RESPONSE",
          recipientId: recipient.id,
        });
        console.log("SEND TEXT RES: ", sendTextResponse);

        return new Response("Track customer order!", {
          status: 200,
        });
      }

      if (postback.title === "Can I see your menu?") {
        sendMenu();
      }
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
