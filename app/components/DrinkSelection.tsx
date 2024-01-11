"use client";

import { Button } from "@/shared_components/ui/button";
import { CupSodaIcon } from "lucide-react";

export interface DrinkProps {
  id: string;
  name: string;
  milk: string;
  custom_request: string;
}

export interface DrinkSelectionProps {
  id: number;
  name: string;
  color: string;
}

const drinkSelections = [
  {
    id: 1,
    name: "Iced americano",
    color: "dark",
  },
  {
    id: 2,
    name: "Spanish latte",
    color: "orange",
  },
  {
    id: 3,
    name: "Matcha latte",
    color: "green",
  },
  {
    id: 4,
    name: "Dark-mocha latte",
    color: "dark-brown",
  },
];

export default function DrinkSelection({
  selectedDrink = null,
  setSelectedDrink = (drink: DrinkSelectionProps) => {},
}: {
  selectedDrink: DrinkSelectionProps | null;
  setSelectedDrink: (drink: DrinkSelectionProps) => void;
}) {
  return (
    <div className="drink-selection">
      <div className="flex items-center gap-2">
        <label htmlFor="drink" className="flex gap-2 items-center">
          <CupSodaIcon /> Select a drink:
        </label>
        <p
          className={`font-bold ${
            selectedDrink ? "underline decoration-dashed" : ""
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
        {drinkSelections.map((drink) => (
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
