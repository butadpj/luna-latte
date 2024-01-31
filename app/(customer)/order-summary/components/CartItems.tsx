import { Separator } from "@/shared/ui/separator";
import { displaySizeName, formatPrice } from "@/lib/utils";
import { CartContext } from "@/providers/CartProvider";
import BottleSVG from "@/shared/BottleSVG";
import { Button } from "@/shared/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Fragment, useContext } from "react";

export default function CartItems() {
  const { cart, updateCartItem, removeCartItemById } = useContext(CartContext);

  const getBottleFillColor = (selectedDrinkColor: string | null) => {
    switch (selectedDrinkColor) {
      case "" || undefined || null:
        return "fill-gray-400";
      default:
        return `fill-${selectedDrinkColor}`;
    }
  };

  return (
    <ul className="cart-items">
      {cart.cartItems.map((item, index) => (
        <Fragment key={item.id}>
          <li className="item">
            <div className="flex items-center justify-between">
              <div className="font-bold flex text-lg items-center gap-2 mb-2">
                - {item.name}{" "}
                {`(${formatPrice(
                  item.base_price + (item.size.additional_price || 0)
                )}${
                  item.milk.additional_price
                    ? ` + ${formatPrice(item.milk.additional_price, {
                        withoutDecimals: true,
                      })}`
                    : ""
                })`}
                <BottleSVG
                  step={3}
                  className={getBottleFillColor(item.color)}
                  size={36}
                />
              </div>
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => {
                  if (confirm("Remove this item from cart?"))
                    removeCartItemById(item.id);
                }}
              >
                <TrashIcon size={16} />
              </Button>
            </div>
            <div className="details pl-5">
              <div>
                <label>Milk:</label>{" "}
                <span className="underline underline-offset-2">
                  {item.milk.name}{" "}
                  {item.milk.additional_price
                    ? `(+${formatPrice(item.milk.additional_price, {
                        withoutDecimals: true,
                      })})`
                    : ""}
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
                  {displaySizeName(item.size.name)}
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
                <label>Final price:</label>{" "}
                <span className="underline underline-offset-2">
                  {formatPrice(
                    (item.base_price +
                      (item.size.additional_price || 0) +
                      (item.milk.additional_price || 0)) *
                      item.quantity
                  )}
                </span>
              </div>
            </div>
          </li>
          <Separator className="my-2" />
        </Fragment>
      ))}
    </ul>
  );
}
