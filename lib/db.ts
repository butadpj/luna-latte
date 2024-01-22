import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      user: {
        full_name: {
          needs: { first_name: true, last_name: true },
          compute(user) {
            if (user.first_name && user.last_name)
              return `${user.first_name} ${user.last_name}`;

            if (user.first_name) return user.first_name;

            if (user.last_name) return user.last_name;

            return null;
          },
        },
        address: {
          needs: { street: true, barangay: true, city: true, province: true },
          compute(user) {
            if (user.street && user.barangay && user.city && user.province)
              return `${user.street}, ${user.barangay} ${user.city}, ${user.province}`;

            return null;
          },
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
