"use client";

import { CartContext } from "@/providers/CartProvider";
import { formatPrice } from "@/lib/utils";
import { useContext } from "react";

export default function Total() {
  const { cart } = useContext(CartContext);
  const shippingFee = 50;

  return (
    <div className="pt-5">
      <div className="computation flex flex-col gap-y-4 pb-5">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p className="text-lg">{formatPrice(cart.totalAmount)}</p>
        </div>
        <div className="flex justify-between ">
          <p>Shipping</p>
          <p className="text-lg">{formatPrice(shippingFee)}</p>
        </div>
      </div>

      <div className="flex justify-between py-2 text-xl font-semibold ">
        <p>Total</p>
        <input
          type="hidden"
          name="total_price"
          value={cart.totalAmount + shippingFee}
        />
        <p className="">{formatPrice(cart.totalAmount + shippingFee)}</p>
      </div>
    </div>
  );
}
