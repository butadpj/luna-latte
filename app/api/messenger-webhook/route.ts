//@ts-nocheck

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
    const { sender: recipient } = JSON.parse(text).entry[0].messaging[0];

    const userProfile = await (
      await fetch(
        `https://graph.facebook.com/${recipient.id}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGES_ACCESS_TOKEN}`
      )
    ).json();

    const response = await (
      await fetch(
        `https://graph.facebook.com/v18.0/155078761029891/messages?recipient={'id': ${recipient.id}}&messaging_type=UPDATE&message={'text':'We have received your order'}&access_token=${process.env.PAGES_ACCESS_TOKEN}`,
        {
          method: "POST",
        }
      )
    ).json();

    console.log("RES: ", response, userProfile);

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
