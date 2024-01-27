"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Milk } from "@prisma/client";
import { MilkIcon, XIcon } from "lucide-react";

export default function MilkSelection({
  milks,
  isDisabled = true,
  selectedMilk = null,
  setSelectedMilk = (milk: Milk | null) => {},
}: {
  milks: Milk[];
  isDisabled: boolean;
  selectedMilk: Milk | null;
  setSelectedMilk: (milk: Milk | null) => void;
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
        {milks.map((milk) => (
          <Button
            key={milk.id}
            type="button"
            variant={milk.color as "default"}
            className={`flex gap-2 rounded-full sm:text-base md:text-lg ${
              selectedMilk?.id === milk.id
                ? "border-2 outline outline-white border-black"
                : ""
            }`}
            disabled={isDisabled}
            onClick={() => {
              setSelectedMilk(milk);
            }}
          >
            {milk.name}{" "}
            <span className="font-mono">
              {milk.additional_price
                ? `(+${formatPrice(milk.additional_price, {
                    withoutDecimals: true,
                  })})`
                : ""}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
