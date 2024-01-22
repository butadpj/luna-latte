import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/order-summary",
    "/api/messenger-webhook",
    "/api/webhook",
  ],
  apiRoutes: [],
});

// export function middleware(request: NextRequest) {
//   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//     style-src 'self' 'nonce-${nonce}';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     block-all-mixed-content;
//     upgrade-insecure-requests;
// `;
//   // Replace newline characters and spaces
//   const contentSecurityPolicyHeaderValue = cspHeader
//     .replace(/\s{2,}/g, " ")
//     .trim();

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-nonce", nonce);

//   requestHeaders.set(
//     "Content-Security-Policy",
//     contentSecurityPolicyHeaderValue
//   );

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
//   response.headers.set(
//     "Content-Security-Policy",
//     contentSecurityPolicyHeaderValue
//   );

//   return response;
// }

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
