import { prisma } from "@/lib/db";

export async function getAllSizes() {
  const sizes = await prisma.size.findMany();
  return sizes;
}
