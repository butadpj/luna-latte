"use client";

import { Button } from "@/shared/ui/button";
import { MilkIcon, XIcon } from "lucide-react";

export interface MilkSelectionProps {
  id: string;
  name: string;
  color: string;
  additionalPrice?: number;
}

const milkSelections: MilkSelectionProps[] = [
  {
    id: "regular",
    name: "Regular",
    color: "light",
  },
  {
    id: "half-half",
    name: "1/2 milk | 1/2 cream (Add ₱20)",
    color: "sweet",
    additionalPrice: 20,
  },
];

export default function MilkSelection({
  isDisabled = true,
  selectedMilk = null,
  setSelectedMilk = (milk: MilkSelectionProps | null) => {},
}: {
  isDisabled: boolean;
  selectedMilk: MilkSelectionProps | null;
  setSelectedMilk: (milk: MilkSelectionProps | null) => void;
}) {
  return (
    <div className="milk-selection">
      <div className="flex items-center gap-2">
        <label
          htmlFor="milk"
          className={`flex gap-2 items-center ${
            isDisabled ? "text-neutral-400" : ""
          }`}
        >
          <MilkIcon /> Select a milk:
        </label>
        <p
          className={`font-bold ${
            selectedMilk ? "underline underline-offset-4 decoration-dashed" : ""
          }`}
        >
          {selectedMilk?.name || "_ _ _ _ _"}
        </p>
        {selectedMilk ? (
          <Button
            type="button"
            className="ml-5"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setSelectedMilk(null)}
          >
            <XIcon className="text-neutral-400" />
          </Button>
        ) : null}

        <input
          disabled={isDisabled}
          type="hidden"
          id="milk"
          name="milk"
          value={selectedMilk?.name || ""}
          onChange={() => {}}
        />
      </div>

      <div className="selection mt-5 pl-5 flex flex-col gap-6 items-start">
        {milkSelections.map((milk) => (
          <Button
            key={milk.id}
            type="button"
            variant={milk.color as "default"}
            className={`rounded-full sm:text-base md:text-lg ${
              selectedMilk?.id === milk.id
                ? "border-2 outline outline-white border-black"
                : ""
            }`}
            disabled={isDisabled}
            onClick={() => {
              setSelectedMilk(milk);
            }}
          >
            {milk.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
