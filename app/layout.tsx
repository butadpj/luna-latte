import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const sono = Sono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna Latte | Order the perfect coffee for YOU!",
  description: "Order and customize your coffee with ease!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen antialiased", sono.className)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
