import Image from "next/image";

import logoDark from "@/assets/logos/dark.svg";
import logoLight from "@/assets/logos/light.svg";
import Customization from "../components/Customization";
import Footer from "@/shared/Footer";

const LOGO_SIZE = 150;

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center pb-24">
        <div className="banner">
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
        </div>

        <Customization />
      </main>
      <Footer />
    </>
  );
}
