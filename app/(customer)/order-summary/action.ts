"use server";

import { createOrder } from "@/lib/queries/orders";
import { CartItemProps } from "@/providers/CartProvider";
import { Prisma } from "@prisma/client";

export async function createOrderAction({
  details,
  items,
  forLoggedInCustomer,
  user_id,
}: {
  forLoggedInCustomer?: boolean | undefined;
  user_id?: string | undefined;
  details: Prisma.OrderCreateInput;
  items: CartItemProps[];
}) {
  const createdOrder = await createOrder({
    details,
    items,
  });

  if (createdOrder) return createdOrder;

  return null;
}
