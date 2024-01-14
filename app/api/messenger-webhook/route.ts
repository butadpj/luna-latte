//@ts-nocheck

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;

  // Parse the query params
  let mode = searchParams.get("hub.mode");
  let token = searchParams.get("hub.verify_token");
  let challenge = searchParams.get("hub.challenge");

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "sample") {
      // Respond with the challenge token from the request

      console.log("WEBHOOK_VERIFIED");
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

export async function POST(req: NextRequest) {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
}
