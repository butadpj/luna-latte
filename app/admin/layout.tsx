import Image from "next/image";
import Link from "next/link";

import icon from "@/assets/icon.png";
import { redirect } from "next/navigation";
import MainNav from "./components/MainNav";
import { Tabs } from "@/shared/ui/tabs";

import { Inter } from "next/font/google";
import { getCurrentUser } from "@/lib/queries/users";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    title: `Admin Panel `,
    description: "",
  };
}

const allowedRoles = ["ADMIN", "STAFF"];

export default async function AdminLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const user = await getCurrentUser();

  if (!allowedRoles.includes(user?.role || "")) {
    redirect("/");
  }

  return (
    <main className={inter.className}>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/admin" className="-m-1.5 flex items-center gap-2 p-1.5">
            <span className="sr-only">Business name</span>
            <Image src={icon} width={35} height={35} alt="brand icon" />
            <span className="text-xl font-bold  dark:text-white">
              Admin Panel
            </span>
          </Link>

          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search />
              <UserNav /> */}

            {/* <Suspense fallback={<Skeleton width={200} height={30} />}>
              <UserAuth hideCart />
            </Suspense> */}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs>{children}</Tabs>
      </div>
    </main>
  );
}
