"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import { DrinkProps } from "@/app/components/DrinkSelection";

type Modify<T, R> = Omit<T, keyof R> & R;

export interface CartItemProps extends DrinkProps {
  quantity: number;
  size: string;
}

interface CartItemUpdateProps
  extends Modify<
    Omit<CartItemProps, "id">,
    {
      color?: string;
      price?: number;
      size?: string;
      name?: string;
      milk?: string;
      custom_request?: string;
      quantity?: number;
    }
  > {}

interface CartProps {
  status: "LOADING" | "INIT";
  cartItems: CartItemProps[] | never[];
  totalItems: number;
  totalAmount: number;
}

interface ContextType {
  cart: {
    totalItems: number;
    totalAmount: number;
    status: "LOADING" | "INIT";
    cartItems: CartItemProps[] | never[];
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
    totalItems: 0,
    totalAmount: 0,
  });

  const computedCart = useMemo(() => {
    return {
      ...cart,
      totalItems: cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      totalAmount: cart.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
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
