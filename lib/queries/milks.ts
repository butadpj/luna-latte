import { prisma } from "@/lib/db";

export async function getAllMilks() {
  const milks = await prisma.milk.findMany();
  return milks;
}
