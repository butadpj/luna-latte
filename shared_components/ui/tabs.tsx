"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = ({ children }: { children: React.ReactElement }) => {
  const pathname = usePathname();

  const splitPaths = pathname.split("/");
  const adminTab =
    splitPaths[splitPaths.length - 1] === "admin"
      ? "overview"
      : splitPaths[splitPaths.length - 1];

  return (
    <TabsPrimitive.Root value={adminTab} className="space-y-4">
      <TabsList className="gap-x-4 px-2 pl-1 text-sm">
        <Link
          className={cn("rounded-sm p-1 px-2", {
            ["bg-black text-white"]: adminTab === "overview",
          })}
          href={"/admin/"}
        >
          Overview
        </Link>
        <Link
          className={cn("rounded-sm p-1 px-2", {
            ["bg-black text-white"]: adminTab === "customers",
          })}
          href={"/admin/customers"}
        >
          Customers
        </Link>
        <Link
          className={cn("rounded-sm p-1 px-2", {
            ["bg-black text-white"]: adminTab === "drinks",
          })}
          href={"/admin/drinks"}
        >
          Drinks
        </Link>
        <Link
          className={cn("rounded-sm p-1 px-2", {
            ["bg-black text-white"]: adminTab === "orders",
          })}
          href={"/admin/orders"}
        >
          Orders
        </Link>
      </TabsList>
      {children}
    </TabsPrimitive.Root>
  );
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsContent };
