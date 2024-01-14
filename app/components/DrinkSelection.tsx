"use client";

import { Button } from "@/shared/ui/button";
import { CupSodaIcon } from "lucide-react";

export interface DrinkProps {
  id: string;
  name: string;
  color: string;
  milk: string;
  custom_request: string;
  price: number;
}

export type DrinkSelectionProps = Omit<DrinkProps, "milk" | "custom_request">;

const drinkSelections: DrinkSelectionProps[] = [
  {
    id: "iced-americano",
    name: "Iced americano",
    color: "dark",
    price: 109,
  },
  {
    id: "spanish-latte",
    name: "Spanish latte",
    color: "orange",
    price: 129,
  },
  {
    id: "matcha-latte",
    name: "Matcha latte",
    color: "green",
    price: 129,
  },
  {
    id: "hazelnut-latte",
    name: "Hazelnut latte",
    color: "light-brown",
    price: 129,
  },
  {
    id: "dark-mocha",
    name: "Dark mocha",
    color: "dark-brown",
    price: 129,
  },
  {
    id: "white-mocha",
    name: "White mocha",
    color: "light",
    price: 129,
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
