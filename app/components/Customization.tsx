"use client";

import BottleSVG from "@/shared_components/BottleSVG";
import { Separator } from "@/shared_components/ui/separator";
import DrinkSelection, { DrinkSelectionProps } from "./DrinkSelection";
import MilkSelection, { MilkSelectionProps } from "./MilkSelection";
import CustomRequest, { CustomRequestProps } from "./CustomRequest";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowRightIcon, CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button, buttonVariants } from "@/shared_components/ui/button";
import Link from "next/link";

export default function Customization() {
  const [selectedDrink, setSelectedDrink] =
    useState<DrinkSelectionProps | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<MilkSelectionProps | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] =
    useState<CustomRequestProps | null>(null);
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="w-full flex flex-col items-center">
      <div className="sticky top-0 w-full flex flex-col items-center bg-[#efefef] dark:bg-black">
        <h2 className="text-xl md:text-2xl mb-5 text-center py-5">
          Customize your order :)
        </h2>

        <div className="relative">
          <BottleSVG
            step={step}
            className={twMerge(getBottleFillColor())}
            size={120}
          />

          {step === 3 ? (
            <CheckIcon className="text-white absolute top-1/2 left-1/2 -translate-x-1/2" />
          ) : null}
        </div>

        {/* {step === 3 ? (
          <Link
            href={"/order-summary"}
            className={twMerge(
              buttonVariants({
                variant: (selectedDrink?.color || "green") as "default",
              }),
              "mt-4 mb-2 flex gap-1 border border-white shadow-2xl"
            )}
          >
            Continue <ArrowRightIcon size={16} />
          </Link>
        ) : null} */}

        {step === 3 ? (
          <div className="flex items-end justify-between w-full max-w-lg px-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label>Quantity: </label>
                <div className="flex items-center gap-4 ">
                  <Button size={"icon"} variant={"ghost"}>
                    <MinusIcon
                      size={20}
                      onClick={() => {
                        setQuantity((prev) => prev - 1);
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
                <select className="bg-transparent" defaultValue={460}>
                  <option value={460}>460 ml</option>
                </select>
              </div>
            </div>

            <Link
              href={"/order-summary"}
              className={twMerge(
                buttonVariants({
                  variant: (selectedDrink?.color || "green") as "default",
                }),
                "mt-4 mb-2 flex gap-1 border border-white shadow-2xl"
              )}
            >
              Continue <ArrowRightIcon size={16} />
            </Link>
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
