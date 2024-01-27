import { prisma } from "@/lib/db";
import { Drink as PrismDrink } from "@prisma/client";

export async function getAllDrinks() {
  const drinks = await prisma.drink.findMany();

  return drinks;
}
