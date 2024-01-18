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
    console.log(JSON.parse(text));
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
