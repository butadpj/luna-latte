import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { createDbUser, deleteDbUser } from "@/lib/queries/users";
import { NextApiResponse } from "next";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  switch (eventType) {
    case "user.created": {
      const {
        id,
        first_name,
        last_name,
        phone_numbers,
        created_at,
        email_addresses,
        image_url,
      } = evt.data;

      try {
        const emails = email_addresses.map((email) => email.email_address);

        if (emails.length) {
          console.log(`Syncing user ${emails[0]} to database..`);

          const user = await createDbUser({
            id,
            image_url,
            first_name,
            last_name,
            email: emails[0],
          });

          const successMessage = `User ${user.email} is synced to database..`;
          console.log(successMessage);

          return new NextResponse(successMessage, {
            status: 201,
          });
        } else {
          throw new Error(
            "Email is required. Can't create user without an email"
          );
        }
      } catch (err) {
        throw err;
      }
    }

    case "user.deleted": {
      const { id } = evt.data;

      if (!id) throw new Error("User id is required to delete a user");

      console.log(`Deleting user ${id} from database..`);
      try {
        const user = await deleteDbUser(id);
        const successMessage = `User ${user.email} is deleted from database..`;
        console.log(successMessage);
      } catch (err) {
        throw err;
      }
    }
  }

  return new NextResponse("", { status: 201 });
}
