import { prisma } from "@/lib/db";
import { Order, Prisma, Statuses } from "@prisma/client";
import { getUserById } from "./users";
import { CartItemProps } from "@/providers/CartProvider";
import { displaySizeName, formatPrice, sendMessageApi } from "../utils";
import { Message } from "@/lib/utils";
import { redirect } from "next/navigation";

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
          create: items.map((item) => ({
            name: item.name,
            price: item.base_price,
            quantity: item.quantity,
            size_name: displaySizeName(item.size.name),
            size_additional_price: item.size.additional_price,
            milk_name: item.milk.name,
            milk_additional_price: item.milk.additional_price,
            custom_request: item.custom_request,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    if (createdOrder) {
      const message: Message = {
        text: `Hello ${
          createdOrder.customer_name
        }! Pa confirm na lang po ng order details, to proceed sa order niyo.

Delivery details:
Name: ${createdOrder.customer_name}
Address : ${createdOrder.delivery_address}
Nearest land mark: ${createdOrder.landmark}

Orders:
${createdOrder.items.map(
  (item) =>
    `- ${item.name} (${formatPrice(
      item.price + (item.milk_additional_price || 0)
    )} | x${item.quantity})\n`
)}

Subtotal: ${formatPrice(createdOrder.total_price)} + (Shipping Fee)
Payment option: ${createdOrder.payment_method}
`,
      };

      await sendMessageApi({
        recipientId: createdOrder.ref,
        message,
      });

      const imageUrl = `https://www.luna-latte.cafe/logo.png`;
      const displayText = "Thank you! Stay caffeinated!";
      redirect(
        `https://www.messenger.com/closeWindow/?image_url=${imageUrl}&display_text=${displayText}`
      );
    }

    throw new Error("Error on creating an order");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrderByRef(ref: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        ref,
      },
      include: {
        items: true,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: Statuses) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
