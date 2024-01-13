"use client";

import DrinkSelection, { DrinkSelectionProps } from "./DrinkSelection";
import MilkSelection, { MilkSelectionProps } from "./MilkSelection";
import CustomRequest, { CustomRequestProps } from "./CustomRequest";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddOrUpdate } from "@/shared/hooks";
import Header from "./Header";

export default function Customization() {
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
      <Header>
        <Header.MainText />
        <Header.Bottle step={step} selectedDrinkColor={selectedDrink?.color} />
        <Header.ActionButtons
          step={step}
          quantity={quantity}
          selectedSize={selectedSize}
          selectedDrinkColor={selectedDrink?.color}
          setQuantity={setQuantity}
          setSelectedSize={setSelectedSize}
          onClickContinue={() => {
            if (selectedDrink && selectedMilk && selectedRequest) {
              addOrUpdate();
            }
            router.push("/order-summary");
          }}
        />
        <Header.Separator />
      </Header>

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
