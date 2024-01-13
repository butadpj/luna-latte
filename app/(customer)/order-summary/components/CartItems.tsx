"use client";

import { DrinkSelectionProps } from "@/app/components/DrinkSelection";
import { formatPrice } from "@/lib/utils";
import { CartContext } from "@/providers/CartProvider";
import BottleSVG from "@/shared/BottleSVG";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { twMerge } from "tailwind-merge";
import Total from "./Total";

export default function CartItems() {
  const { cart, removeAllCartItems, updateCartItem } = useContext(CartContext);

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
        <>
          <div className="flex items-start justify-between px-2">
            <Button
              onClick={() => removeAllCartItems()}
              variant={"outline"}
              size={"sm"}
              className="-ml-2 flex items-center gap-2 mb-4"
            >
              Clear all <TrashIcon size={16} className="-mt-[1px]" />
            </Button>

            <Link
              href={"/"}
              className={twMerge(
                buttonVariants({ variant: "green", size: "sm" }),
                "flex gap-1 items-center"
              )}
            >
              Order more <PlusIcon size={16} />
            </Link>
          </div>

          <ul className="cart-items">
            {cart.cartItems.map((item, index) => (
              <Fragment key={item.id}>
                <li className="item">
                  <div className="font-bold flex text-xl items-center gap-2 mb-2">
                    - {item.name} ({formatPrice(item.price * item.quantity)})
                    <BottleSVG
                      step={3}
                      className={getBottleFillColor(item.color)}
                      size={24}
                    />
                  </div>
                  <div className="details text-lg pl-5">
                    <div>
                      <label>Milk:</label>{" "}
                      <span className="underline underline-offset-2">
                        {item.milk}
                      </span>
                    </div>
                    <div>
                      <label>Request:</label>{" "}
                      <span className="underline underline-offset-2">
                        "{item.custom_request}"
                      </span>
                    </div>
                    <div>
                      <label>Size:</label>{" "}
                      <span className="underline underline-offset-2">
                        {item.size}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <label>Quantity:</label>{" "}
                      <div className="flex items-center">
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          onClick={() => {
                            if (item.quantity === 1) {
                              if (confirm("Remove this item from cart?"))
                                updateCartItem(item.id, {
                                  quantity: item.quantity - 1,
                                });
                            } else {
                              updateCartItem(item.id, {
                                quantity: item.quantity - 1,
                              });
                            }
                          }}
                        >
                          <MinusIcon size={20} />
                        </Button>
                        <span className="underline underline-offset-2">
                          {item.quantity}
                        </span>
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          onClick={() => {
                            updateCartItem(item.id, {
                              quantity: item.quantity + 1,
                            });
                          }}
                        >
                          <PlusIcon size={20} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label>Price:</label>{" "}
                      <span className="underline underline-offset-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </li>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </ul>

          <Total />

          <Separator className="my-2" />

          <div className="mt-4 w-full flex items-start justify-end">
            <Link
              href={"/"}
              className={twMerge(
                buttonVariants({ variant: "orange", size: "sm" })
              )}
            >
              Confirm order
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
