import type { Metadata } from "next";
import { headers } from "next/headers";
import { Sono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "@/shared/ui/toaster";
import Script from "next/script";
import MessengerChatPlugin from "./MessengerChatPlugin";

const sono = Sono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna Latte | Order the perfect coffee for YOU!",
  description: "Order and customize your coffee with ease!",
};

export default function RootLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const nonce = headers().get("x-nonce");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen antialiased", sono.className)}>
          <Script strategy="afterInteractive">
            {`window.fbAsyncInit = function() {
                FB.init({
                    appId            : '2084388195253551',
                    xfbml            : true,
                    version          : 'v18.0'
                  });
              };
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></Script>

          <div
            className="fb-send-to-messenger"
            //@ts-ignore
            messenger_app_id="2084388195253551"
            page_id="155078761029891"
            // ref="<PASS_THROUGH_PARAM>"
            // color="<blue | white>"
            // size="<standard | large | xlarge>"
            cta_text="SUBSCRIBE_IN_MESSENGER"
          ></div>

          <CartProvider>{children}</CartProvider>
          <Toaster />

          {/* <MessengerChatPlugin /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
