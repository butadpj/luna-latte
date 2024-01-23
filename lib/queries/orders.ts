import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getUserById } from "./users";
import { CartItemProps } from "@/providers/CartProvider";

export async function createOrder({
  forLoggedInCustomer = false,
  user_id,
  details,
  items,
}: {
  forLoggedInCustomer?: boolean;
  user_id?: string;
  details: Prisma.OrderCreateInput;
  items: CartItemProps[];
}) {
  try {
    if (forLoggedInCustomer && user_id) {
      const logged_in_customer = await getUserById(user_id);

      if (logged_in_customer) {
        const createdOrder = await prisma.order.create({
          data: {
            logged_in_customer: {
              connect: {
                id: logged_in_customer.id,
              },
            },
            ...details,
          },
        });

        return createdOrder;
      }

      throw new Error("Can't create order. Logged in customer doesn't exist");
    }

    const createdOrder = await prisma.order.create({
      data: {
        ...details,
        items: {
          create: items,
        },
      },
    });

    return createdOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
