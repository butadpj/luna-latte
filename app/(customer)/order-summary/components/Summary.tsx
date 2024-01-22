"use client";

import { CartContext } from "@/providers/CartProvider";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import Total from "./Total";
import CartItems from "./CartItems";

import OrderModal from "./OrderModal";

export default function Summary() {
  const { cart, removeAllCartItems } = useContext(CartContext);

  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);

  if (cart.status === "LOADING")
    return (
      <h2 className="text-xl text-center md:text-2xl">
        Generating order(s) summary..
      </h2>
    );

  return (
    <>
      <OrderModal
        isOpen={showConfirmOrderModal}
        onOpenChange={(open) => {
          if (!open) {
            // window.location.reload();
          } else setShowConfirmOrderModal(true);
        }}
      />

      <div className="w-full max-w-xl">
        <Header />

        {cart.cartItems.length > 0 ? (
          <div className="summary">
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

            <CartItems />
            <Total />

            <Separator className="my-2" />

            <div className="mt-4 w-full flex items-start justify-end">
              <Button
                variant={"orange"}
                size={"sm"}
                onClick={() => {
                  setShowConfirmOrderModal(true);
                }}
              >
                Confirm order
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function Header() {
  const { cart } = useContext(CartContext);

  return (
    <h2 className="text-xl md:text-2xl mb-5 py-5">
      {cart.cartItems.length > 0 ? (
        "Your order(s) summary:"
      ) : (
        <div className="flex flex-col items-start">
          No orders yet :(
          <Link
            href={"/"}
            className={twMerge(buttonVariants({ variant: "default" }), "mt-4")}
          >
            Order something
          </Link>
        </div>
      )}
    </h2>
  );
}
