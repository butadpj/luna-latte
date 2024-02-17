"use client";

import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SendToMessenger from "./SendToMessenger";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function GuardDialog() {
  const searchParams = useSearchParams();

  const [isOptInDone, setIsOptInDone] = useState(false);
  const [countDown, setCountDown] = useState(8);

  const recipient_id = searchParams.get("recipient_id");

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

  return (
    <Dialog open={!getLocalStorageItem("recipient_id")} modal>
      <DialogContent
        //@ts-ignore
        hideClose
        className="pb-5 px-10 lg:max-w-screen-sm overflow-y-scroll max-h-screen flex flex-col justify-center items-center"
      >
        {getContent()}
      </DialogContent>
    </Dialog>
  );
}
