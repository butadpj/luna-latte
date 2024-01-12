"use client";

import BottleSVG from "@/shared/BottleSVG";
import { Separator } from "@/shared/ui/separator";
import DrinkSelection, { DrinkSelectionProps } from "./DrinkSelection";
import MilkSelection, { MilkSelectionProps } from "./MilkSelection";
import CustomRequest, { CustomRequestProps } from "./CustomRequest";
import { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowRightIcon, CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/providers/CartProvider";
import { useAddOrUpdate } from "@/shared/hooks";

export default function Customization() {
  const { addToCart, cart, getCartItemById } = useContext(CartContext);
  const router = useRouter();
  const [selectedDrink, setSelectedDrink] =
    useState<DrinkSelectionProps | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<MilkSelectionProps | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] =
    useState<CustomRequestProps | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("460 ml");

  const step = useMemo(() => {
    if (selectedMilk && !selectedRequest) return 2;
    if (selectedRequest && selectedMilk) return 3;
    return 1;
  }, [selectedMilk, selectedRequest]);

  useEffect(() => {
    if (selectedMilk === null) setSelectedRequest(null);
  }, [selectedMilk, selectedRequest]);

  const getBottleFillColor = () => {
    switch (selectedDrink?.color) {
      case "" || undefined:
        return "fill-gray-400";
      case "dark-brown":
      case "dark":
        return step <= 2
          ? `fill-${selectedDrink?.color} stroke-white`
          : `fill-${selectedDrink?.color}`;
      default:
        return `fill-${selectedDrink?.color}`;
    }
  };

  const addOrUpdate = useAddOrUpdate({
    item: {
      id: `drink-${selectedDrink?.id}-${selectedMilk?.id}-${selectedRequest?.message}-${selectedSize}`,
      name: selectedDrink?.name || "",
      milk: selectedMilk?.name || "",
      custom_request: selectedRequest?.message || "",
      quantity,
      size: selectedSize || "",
      price: 129,
      color: selectedDrink?.color || "",
    },
    quantity,
  });

  return (
    <div className="w-full max-w-xl flex flex-col items-center ">
      <div className="sticky z-10 top-0 w-full flex flex-col items-center bg-[#efefef] dark:bg-black px-5">
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
                    variant: "ghost",
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
        <div className="relative">
          <BottleSVG
            step={step}
            className={twMerge(getBottleFillColor())}
            size={120}
          />

          {step === 3 ? (
            <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 font-bold font-mono">
              ₱129
            </p>
          ) : null}
        </div>

        {step === 3 ? (
          <div className="flex items-end justify-between w-full text-sm md:text-lg max-w-lg px-10">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <label>Quantity: </label>
                <div className="flex items-center">
                  <Button size={"icon"} variant={"ghost"}>
                    <MinusIcon
                      size={20}
                      onClick={() => {
                        if (quantity > 1) setQuantity((prev) => prev - 1);
                      }}
                    />
                  </Button>
                  {quantity}
                  <Button size={"icon"} variant={"ghost"}>
                    <PlusIcon
                      size={20}
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                      }}
                    />
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
                if (selectedDrink && selectedMilk && selectedRequest) {
                  addOrUpdate();
                }
                router.push("/order-summary");
              }}
              variant={(selectedDrink?.color || "green") as "default"}
              size={"sm"}
              className={
                "mt-4 mb-2 flex gap-1 border border-white md:text-base shadow-2xl"
              }
            >
              Continue <ArrowRightIcon size={16} />
            </Button>
          </div>
        ) : null}

        <Separator className="mt-5" />
      </div>

      <div className="space-y-12 sm:text-lg md:text-xl pt-12 px-5">
        <DrinkSelection
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
        />
        <MilkSelection
          selectedMilk={selectedMilk}
          setSelectedMilk={setSelectedMilk}
          isDisabled={!selectedDrink}
        />
        <CustomRequest
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          isDisabled={step < 2}
        />
      </div>
    </div>
  );
}
