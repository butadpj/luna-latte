"use client";

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SendToMessenger from "./SendToMessenger";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function GuardDialog() {
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isOptInDone, setIsOptInDone] = useState(false);
  const [countDown, setCountDown] = useState(8);

  const recipient_id = searchParams.get("recipient_id");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLocalStorageItem("recipient_id", recipient_id);
  }, [recipient_id]);

  useEffect(() => {
    if (isOptInDone) {
      setInterval(() => {
        setCountDown((count) => count - 1);
      }, 1000);
    }
  }, [isOptInDone]);

  useEffect(() => {
    if (countDown <= 0) {
      window.location.reload();
    }
  }, [countDown]);

  const getContent = () => {
    if (!isOptInDone) {
      return (
        <>
          <DialogHeader>
            <DialogTitle className="mb-5 px-6 text-center">
              Looks like you're accessing our site directly 😊 <br />
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            Please click the 'Get Started' button and continue with your
            Messenger account
          </DialogDescription>
          <SendToMessenger
            onOptIn={(ref) => {
              setIsOptInDone(true);
            }}
          />
          <Separator />
          <DialogDescription className="text-center text-sm gap-1 flex flex-wrap items-center justify-center">
            or watch our journey here:{" "}
            <Link
              target="_blank"
              href={"https://www.tiktok.com/@lunalatteph"}
              className={twMerge(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "flex gap-1 items-center"
              )}
            >
              <span>Tiktok: </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="12.25"
                viewBox="0 0 448 512"
              >
                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path
                  fill="var(--foreground)"
                  d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                />
              </svg>
            </Link>{" "}
          </DialogDescription>
        </>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="mb-5 px-6 text-center">
            May chat kami sa iyo ka-Luna! 😊 Check mo Messenger mo dali hihi!{" "}
            <br />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          This page will be refreshed in {countDown}
        </DialogDescription>
      </>
    );
  };

  const isOpen = () => {
    const allowedPages = ["/privacy-policy"];

    if (allowedPages.includes(pathname)) {
      return false;
    } else {
      const isAccessingDirectly = !getLocalStorageItem("recipient_id");
      return isAccessingDirectly;
    }
  };

  return isClient ? (
    <Dialog open={isOpen()}>
      <DialogContent
        //@ts-ignore
        hideClose
        className="pb-5 px-10 lg:max-w-screen-sm overflow-y-scroll max-h-screen flex flex-col justify-center items-center"
      >
        {getContent()}
      </DialogContent>
    </Dialog>
  ) : null;
}
