import { prisma } from "@/lib/db";
import { Prisma, User } from "@prisma/client";

export async function createDbUser(user: Prisma.UserCreateInput) {
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    return createdUser;
  } catch (err) {
    throw err;
  }
}

export async function deleteDbUser(userId: string) {
  try {
    const createdUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return createdUser;
  } catch (err) {
    throw err;
  }
}
