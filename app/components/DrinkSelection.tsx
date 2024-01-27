"use client";

import { Button } from "@/shared/ui/button";
import { Drink } from "@prisma/client";
import { CupSodaIcon } from "lucide-react";

export default function DrinkSelection({
  drinks,
  selectedDrink = null,
  setSelectedDrink = (drink: Drink) => {},
}: {
  drinks: Drink[];
  selectedDrink: Drink | null;
  setSelectedDrink: (drink: Drink) => void;
}) {
  return (
    <div className="drink-selection">
      <div className="flex items-center gap-2">
        <label htmlFor="drink" className="flex gap-2 items-center">
          <CupSodaIcon /> Select a drink:
        </label>
        <p
          className={`font-bold ${
            selectedDrink
              ? "underline underline-offset-4 decoration-dashed"
              : ""
          }`}
        >
          {selectedDrink?.name || "_ _ _ _ _"}
        </p>
        <input
          type="hidden"
          id="drink"
          name="drink"
          value={selectedDrink?.name || ""}
          onChange={() => {}}
        />
      </div>

      <div className="selection mt-5 pl-5 flex flex-col gap-6 items-start">
        {drinks.map((drink) => (
          <Button
            id={`drink-${drink.id}`}
            key={drink.id}
            type="button"
            variant={drink.color as "default"}
            className={`rounded-full sm:text-base md:text-lg ${
              selectedDrink?.id === drink.id
                ? "border-2 outline outline-white border-black"
                : ""
            }`}
            onClick={() => {
              setSelectedDrink(drink);
            }}
          >
            {drink.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
