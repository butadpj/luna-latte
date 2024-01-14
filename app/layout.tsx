import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "@/shared/ui/toaster";
import Script from "next/script";

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen antialiased", sono.className)}>
          <CartProvider>{children}</CartProvider>
          <Toaster />

          {/* <!-- Messenger Chat Plugin Code --> */}
          <div id="fb-root"></div>

          {/* <!-- Your Chat Plugin code --> */}
          <div id="fb-customer-chat" className="fb-customerchat"></div>

          <Script>
            {`var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "155078761029891");
      chatbox.setAttribute("attribution", "biz_inbox");`}
          </Script>

          {/* <!-- Your SDK code --> */}
          <Script>
            {`window.fbAsyncInit = function() {
        FB.init({
          appId            : '2084388195253551',
          xfbml            : true,
          version          : 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      `}
          </Script>
          <Script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
