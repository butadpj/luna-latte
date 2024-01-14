import { CartContext } from "@/providers/CartProvider";
import BottleSVG from "@/shared/BottleSVG";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Separator as UISeparator } from "@/shared/ui/separator";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { DrinkProps, DrinkSelectionProps } from "./DrinkSelection";
import { formatPrice } from "@/lib/utils";

export default function Header({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <header className="sticky z-10 top-0 w-full flex flex-col items-center bg-[#efefef] dark:bg-black px-5">
      {children}
    </header>
  );
}

export function MainText() {
  const { cart } = useContext(CartContext);

  return (
    <h2 className="text-xl md:text-2xl mb-5 text-center py-5 flex items-center justify-center flex-wrap gap-2">
      Customize {cart.cartItems.length > 0 ? "another" : "your"} order :)
      {cart.cartItems.length > 0 ? (
        <>
          {" "}
          or
          <Link
            href={"/order-summary"}
            className={twMerge(
              buttonVariants({
                variant: "green",
                size: "lg",
              }),
              "text-xl"
            )}
          >
            Checkout orders
          </Link>
        </>
      ) : null}
    </h2>
  );
}

export function Bottle({
  step,
  selectedDrink = null,
  showPrice = false,
}: {
  step: number | undefined;
  selectedDrink: DrinkSelectionProps | null;
  showPrice?: boolean;
}) {
  if (!step) throw new Error("props 'step' needs to be defined");

  const getBottleFillColor = () => {
    switch (selectedDrink?.color) {
      case "" || undefined:
        return "fill-gray-400";
      case "dark-brown":
      case "dark":
        return step <= 2
          ? `fill-${selectedDrink?.color} stroke-neutral-500`
          : `fill-${selectedDrink?.color}`;
      default:
        return `fill-${selectedDrink?.color}`;
    }
  };

  return (
    <div className="bottle relative">
      <BottleSVG
        step={step}
        className={twMerge(getBottleFillColor())}
        size={120}
      />

      {step === 3 && showPrice ? (
        <p
          className={twMerge(
            `text-white absolute top-1/2 left-1/2 -translate-x-1/2 font-bold font-mono`,
            selectedDrink?.color === "light" ||
              selectedDrink?.color === "orange"
              ? "text-dark"
              : ""
          )}
        >
          {formatPrice(selectedDrink?.price || 0, {
            withoutDecimals: true,
          })}
        </p>
      ) : null}
    </div>
  );
}

export function ActionButtons({
  step,
  quantity,
  selectedDrinkColor,
  setQuantity,
  selectedSize,
  setSelectedSize,
  onClickContinue,
}: {
  step: number | undefined;
  quantity: number;
  selectedDrinkColor: string | undefined;
  setQuantity: Dispatch<SetStateAction<number>>;
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
  onClickContinue: () => void;
}) {
  return step === 3 ? (
    <div className="flex items-end justify-between w-full text-sm md:text-lg max-w-lg px-5">
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <label>Quantity: </label>
          <div className="flex items-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                if (quantity > 1) setQuantity((prev) => prev - 1);
              }}
            >
              <MinusIcon size={20} />
            </Button>
            {quantity}
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            >
              <PlusIcon size={20} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label>Size: </label>
          <select
            className="bg-transparent"
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
            }}
          >
            <option value={"460 ml"}>460 ml</option>
          </select>
        </div>
      </div>

      <Button
        onClick={(e) => {
          onClickContinue();
        }}
        variant={selectedDrinkColor as "default"}
        size={"sm"}
        className={
          "mt-4 mb-2 flex gap-1 border border-white md:text-base shadow-2xl"
        }
      >
        Continue <ArrowRightIcon size={16} />
      </Button>
    </div>
  ) : null;
}

export function Separator() {
  return <UISeparator className="mt-5" />;
}

Header.MainText = MainText;
Header.Bottle = Bottle;
Header.ActionButtons = ActionButtons;
Header.Separator = Separator;
