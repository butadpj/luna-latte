import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Prisma, User } from "@prisma/client";

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    console.log(clerkUser.id);
    const users = await prisma.user.findMany();
    console.log(users);

    const user = await prisma.user.findUnique({
      where: {
        id: clerkUser.id,
      },
    });

    if (user) return user;

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(user_id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user) return user;

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

export async function deleteDbUser(user_id: string) {
  try {
    const createdUser = await prisma.user.delete({
      where: {
        id: user_id,
      },
    });

    return createdUser;
  } catch (err) {
    throw err;
  }
}
