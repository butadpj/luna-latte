"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import { $Enums, Drink, Milk, Size } from "@prisma/client";

type Modify<T, R> = Omit<T, keyof R> & R;

interface CartItemMilk
  extends Omit<Milk, "id" | "created_at" | "updated_at" | "color"> {}

interface CartItemSIze extends Omit<Size, "id" | "created_at" | "updated_at"> {}

export interface CartItemProps
  extends Modify<
    Omit<Drink, "created_at" | "updated_at">,
    {
      quantity: number;
      milk: CartItemMilk;
      custom_request: string;
      size: CartItemSIze;
    }
  > {}

interface CartItemUpdateProps
  extends Modify<
    Omit<CartItemProps, "id" | "base_price">,
    {
      color?: $Enums.Colors;
      size?: Size;
      name?: string;
      milk?: Milk;
      custom_request?: string;
      quantity?: number;
    }
  > {}

interface CartProps {
  status: "LOADING" | "INIT";
  cartItems: CartItemProps[];
  total_items: number;
  total_amount: number;
}

interface ContextType {
  cart: {
    total_items: number;
    total_amount: number;
    status: "LOADING" | "INIT";
    cartItems: CartItemProps[];
  };
  addToCart: (newItem: CartItemProps) => void;
  updateCartItem: (
    itemId: string,
    propertiesToUpdate: CartItemUpdateProps
  ) => void;
  getCartItemById: (itemId: string) => CartItemProps | undefined;
  removeAllCartItems: () => void;
  removeCartItemById: (itemId: string) => void;
}

export const CartContext = createContext<ContextType>({} as ContextType);

export default function CartProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [cart, setCart] = useState<CartProps>({
    status: "LOADING",
    cartItems: [],
    total_items: 0,
    total_amount: 0,
  });

  const computedCart = useMemo(() => {
    return {
      ...cart,
      total_items: cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      total_amount: cart.cartItems.reduce(
        (total, item) =>
          total +
          (item.base_price +
            (item.size.additional_price || 0) +
            (item.milk.additional_price || 0)) *
            item.quantity,
        0
      ),
    };
  }, [cart]);

  const removeAllCartItems = () => {
    setCart((cart) => ({ ...cart, cartItems: [] }));
  };

  const getCartItemById = (itemId: string) =>
    computedCart.cartItems.find((item) => item.id === itemId);

  const addToCart = (newItem: CartItemProps) => {
    if (newItem) {
      setCart((cart) => ({
        ...cart,
        cartItems: [newItem, ...cart.cartItems],
      }));
    }
  };

  const removeCartItemById = (itemId: string) => {
    setCart((cart) => {
      return {
        ...cart,
        cartItems: cart.cartItems.filter((item) => item.id !== itemId),
      };
    });
  };

  const updateCartItem = (
    itemId: string,
    propertiesToUpdate: CartItemUpdateProps
  ) => {
    if (itemId) {
      if (
        propertiesToUpdate.quantity !== undefined &&
        propertiesToUpdate.quantity < 1
      ) {
        removeCartItemById(itemId);
        return;
      }

      const updatedCartItems = cart.cartItems.map((item) => {
        if (item.id === itemId)
          return {
            ...item,
            ...propertiesToUpdate,
          };

        return item;
      });

      setCart((cart) => ({
        ...cart,
        cartItems: updatedCartItems,
      }));
    }
  };

  // Sync state to local storage
  useEffect(() => {
    if (computedCart.status === "LOADING") {
      const clientCart = getLocalStorageItem("cart");
      if (clientCart) return setCart({ ...clientCart, status: "INIT" });

      return setCart((cart) => ({ ...cart, status: "INIT" }));
    } else {
      setLocalStorageItem("cart", computedCart);
    }
  }, [computedCart]);

  return (
    <CartContext.Provider
      value={{
        cart: computedCart,
        addToCart,
        updateCartItem,
        getCartItemById,
        removeAllCartItems,
        removeCartItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
