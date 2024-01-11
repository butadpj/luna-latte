"use client";

import BottleSVG from "@/shared_components/BottleSVG";
import { Separator } from "@/shared_components/ui/separator";
import DrinkSelection, { DrinkSelectionProps } from "./DrinkSelection";
import MilkSelection, { MilkSelectionProps } from "./MilkSelection";
import CustomRequest, { CustomRequestProps } from "./CustomRequest";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon } from "lucide-react";

export default function Customization() {
  const [selectedDrink, setSelectedDrink] =
    useState<DrinkSelectionProps | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<MilkSelectionProps | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] =
    useState<CustomRequestProps | null>(null);

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
      <div className="sticky top-0 w-full flex flex-col items-center bg-light dark:bg-black">
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
        <Separator className="mt-5" />
      </div>

      <form className="space-y-12 sm:text-lg md:text-xl pt-12">
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
      </form>
    </div>
  );
}
