import Image from "next/image";
import Link from "next/link";
import logoDark from "@/assets/logos/dark.svg";
import logoLight from "@/assets/logos/light.svg";
import icon from "@/assets/icon.png";

import { FacebookIcon, LockIcon, MailIcon, PhoneIcon } from "lucide-react";

const LOGO_SIZE = 50;

export default function Footer() {
  return (
    <footer className="border-t-[1px] border-t-white shadow p-2">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              className="hidden dark:block"
              src={icon}
              alt="dark-mode-image"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
            <Image
              className="-ml-5 block dark:hidden"
              src={icon}
              alt="light-mode-image"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
            <span className="block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Luna-Latte
            </span>
          </Link>
          <ul className="flex flex-col items-start lg:flex-row gap-y-2 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                target="_blank"
                href="https://www.facebook.com/lunalatteph"
                className="hover:underline me-4 md:me-6 flex gap-2 items-center"
              >
                <FacebookIcon size={16} />
                Facebook page
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:underline me-4 md:me-6 flex gap-2 items-center"
              >
                <LockIcon size={16} /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="mailto: lunalatteph@gmail.com"
                className="hover:underline me-4 md:me-6 flex gap-2 items-center"
              >
                <MailIcon size={16} /> lunalatteph@gmail.com
              </Link>
            </li>
            <li>
              <Link
                href="tel: 09091957066"
                className="hover:underline me-4 md:me-6 flex gap-2 items-center"
              >
                <PhoneIcon size={16} /> 09091957066
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            Luna-Latte™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
