"use client";

import DrinkSelection from "./DrinkSelection";
import MilkSelection from "./MilkSelection";
import CustomRequest, { CustomRequestProps } from "./CustomRequest";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddOrUpdate } from "@/shared/hooks";
import Header from "./Header";
import { Milk, Drink, Sizes, Size } from "@prisma/client";

export default function Customization({
  sizes,
  drinks,
  milks,
}: {
  sizes: Size[];
  drinks: Drink[];
  milks: Milk[];
}) {
  const router = useRouter();
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<CustomRequestProps | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[0]);

  const isIcedAmericano =
    selectedDrink?.name.toLowerCase() === "iced americano";

  const step = useMemo(() => {
    if (isIcedAmericano) {
      if (selectedRequest) return 3;

      return 2;
    }

    if (selectedMilk && !selectedRequest) return 2;
    if (selectedRequest && selectedMilk) return 3;

    return 1;
  }, [selectedMilk, selectedRequest, selectedDrink?.name]);

  useEffect(() => {
    if (isIcedAmericano)
      //@ts-ignore
      setSelectedMilk({ name: "N/A" });
    else setSelectedMilk(null);
  }, [selectedDrink?.name]);

  useEffect(() => {
    if (selectedMilk === null && isIcedAmericano) setSelectedRequest(null);
  }, [selectedMilk, selectedRequest, selectedDrink?.name]);

  const computePrice = () => {
    if (!selectedDrink) {
      throw new Error("Can't compute price without selecting a drink first");
    }

    if (selectedMilk?.additional_price) {
      return selectedDrink.base_price + selectedMilk.additional_price;
    }

    return selectedDrink.base_price;
  };

  const addOrUpdate = useAddOrUpdate({
    item:
      selectedDrink && selectedMilk && selectedRequest
        ? {
            id: `drink-${selectedDrink.id}-${selectedMilk?.id}-${selectedRequest.message}-${selectedSize}`,
            name: selectedDrink.name,
            milk: selectedMilk,
            custom_request: selectedRequest.message,
            quantity,
            size: selectedSize,
            base_price: selectedDrink.base_price,
            color: selectedDrink.color,
          }
        : null,
    quantity,
  });

  return (
    <div className="w-full max-w-xl flex flex-col items-center ">
      <Header>
        <Header.MainText />
        <Header.Bottle
          step={step}
          selectedSize={selectedSize}
          selectedDrink={selectedDrink}
          selectedMilk={selectedMilk}
          showPrice
        />
        <Header.ActionButtons
          sizes={sizes}
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
          drinks={drinks}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
        />
        <MilkSelection
          milks={milks}
          selectedMilk={selectedMilk}
          setSelectedMilk={setSelectedMilk}
          isDisabled={!selectedDrink || isIcedAmericano}
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
