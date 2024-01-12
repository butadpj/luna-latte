import { CartContext, CartItemProps } from "@/providers/CartProvider";
import { useContext } from "react";

export function useAddOrUpdate({
  item = null,
  quantity = 1,
}: {
  item: CartItemProps | null;
  quantity?: number;
}) {
  const { getCartItemById, addToCart, updateCartItem } =
    useContext(CartContext);

  return () => {
    if (item) {
      const existingItem = getCartItemById(item.id);

      if (existingItem) {
        updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + quantity,
        });
      } else {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
          size: item.size,
          color: item.color,
          custom_request: item.custom_request,
          milk: item.milk,
        });
      }
    }
  };
}
