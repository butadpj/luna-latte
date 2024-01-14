import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "@/shared/ui/toaster";

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
        </body>
      </html>
    </ClerkProvider>
  );
}
