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
import Providers from "@/providers/Providers";

const sono = Sono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna-Latte Cafe | Better Latte than never!",
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
        <meta
          name="facebook-domain-verification"
          content="6pxdbxzavkp3n9gg11sya66r9xjouk"
        />
        <body className={cn("min-h-screen antialiased", sono.className)}>
          <Providers>{children}</Providers>
          <Toaster />

          {/* <MessengerChatPlugin /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
