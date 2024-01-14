import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
}
