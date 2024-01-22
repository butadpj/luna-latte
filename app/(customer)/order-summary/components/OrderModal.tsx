"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import OrderForm from "./OrderForm";
import SendToMessenger from "@/shared/SendToMessenger";

export default function OrderModal({
  isOpen = false,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="pb-0 px-0 lg:max-w-screen-sm overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="mb-5 px-6">
            We just need more of your details :)
          </DialogTitle>

          <OrderForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
