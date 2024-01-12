"use client";

import { DrinkSelectionProps } from "@/app/components/DrinkSelection";
import { formatPrice } from "@/lib/utils";
import { CartContext } from "@/providers/CartProvider";
import BottleSVG from "@/shared/BottleSVG";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { twMerge } from "tailwind-merge";

export default function CartItems() {
  const { cart, removeAllCartItems } = useContext(CartContext);

  const getBottleFillColor = (selectedDrinkColor: string | null) => {
    switch (selectedDrinkColor) {
      case "" || undefined || null:
        return "fill-gray-400";
      default:
        return `fill-${selectedDrinkColor}`;
    }
  };

  if (cart.status === "LOADING")
    return <h2 className="text-xl text-center md:text-2xl">Cart loading..</h2>;

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl md:text-2xl mb-5 py-5">
        {cart.cartItems.length > 0 ? (
          "Your order(s) summary:"
        ) : (
          <div className="flex flex-col items-start">
            No orders yet :(
            <Link
              href={"/"}
              className={twMerge(
                buttonVariants({ variant: "default" }),
                "mt-4"
              )}
            >
              Order something
            </Link>
          </div>
        )}
      </h2>

      {cart.cartItems.length > 0 ? (
        <Button
          onClick={() => removeAllCartItems()}
          variant={"ghost"}
          className="-ml-2 flex items-center gap-2 mb-4"
        >
          Clear all <TrashIcon size={16} className="-mt-[1px]" />
        </Button>
      ) : null}
      <ul className="cart-items ">
        {cart.cartItems.map((item, index) => (
          <Fragment key={item.id}>
            <li>
              <div className="details">
                <div className="font-bold flex items-center gap-2">
                  - {item.name} ({formatPrice(item.price)})
                  <BottleSVG
                    step={3}
                    className={getBottleFillColor(item.color)}
                    size={24}
                  />
                </div>
                <div className="more-details text-sm">
                  <div className="ml-5">
                    <label>Milk:</label>{" "}
                    <span className="underline underline-offset-2">
                      {item.milk}
                    </span>
                  </div>
                  <div className="ml-5">
                    <label>Request:</label>{" "}
                    <span className="underline underline-offset-2">
                      "{item.custom_request}"
                    </span>
                  </div>
                  <div className="ml-5">
                    <label>Size:</label>{" "}
                    <span className="underline underline-offset-2">
                      {item.size}
                    </span>
                  </div>
                  <div className="ml-5">
                    <label>Quantity:</label>{" "}
                    <span className="underline underline-offset-2">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="ml-5">
                    <label>Total:</label>{" "}
                    <span className="underline underline-offset-2">
                      {formatPrice(item.quantity * item.price)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
            <Separator className="my-2" />
            {index === cart.cartItems.length - 1 ? (
              <div className="mt-4 w-full flex items-start justify-between">
                <Link
                  href={"/"}
                  className={twMerge(
                    buttonVariants({ variant: "default", size: "sm" })
                  )}
                >
                  Add more
                </Link>

                <Link
                  href={"/"}
                  className={twMerge(
                    buttonVariants({ variant: "orange", size: "sm" })
                  )}
                >
                  Confirm order
                </Link>
              </div>
            ) : null}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
