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
      <DialogContent className="lg:max-w-screen-sm overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="mb-10">
            We just need more of your details :)
          </DialogTitle>

          <OrderForm submitButton={<SendToMessenger />} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
