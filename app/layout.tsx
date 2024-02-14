import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "@/shared/ui/toaster";
import Providers from "@/providers/Providers";
import GuardDialog from "@/shared/GuardDialog";

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
          content="2alpwfc9ut26ahx94evdvtsz3adn4v"
        />
        <body className={cn("min-h-screen antialiased", sono.className)}>
          <GuardDialog />
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
