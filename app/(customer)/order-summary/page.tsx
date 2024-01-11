import Image from "next/image";

import logoDark from "@/assets/logos/dark.svg";
import logoLight from "@/assets/logos/light.svg";

const LOGO_SIZE = 150;

export default function OrderSummary() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-24">
      <Image
        className="hidden dark:block"
        src={logoDark}
        alt="dark-mode-image"
        width={LOGO_SIZE}
        height={LOGO_SIZE}
      />
      <Image
        className="block dark:hidden"
        src={logoLight}
        alt="light-mode-image"
        width={LOGO_SIZE}
        height={LOGO_SIZE}
      />

      <div className="w-full flex flex-col items-start px-5">
        <h2 className="text-xl md:text-2xl mb-5 py-5">
          Your order(s) summary:
        </h2>
      </div>
    </main>
  );
}
