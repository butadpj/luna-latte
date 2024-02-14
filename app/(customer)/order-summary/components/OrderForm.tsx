"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm, useFormState } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/shared/ui/form";
import { toast } from "@/shared/ui/use-toast";
import SendToMessenger from "@/shared/SendToMessenger";
import Link from "next/link";
import { getFullAddress } from "@/lib/utils";
import { useCurrentUser } from "@/shared/hooks";
import { createOrderAction } from "../action";
import { useContext } from "react";
import { CartContext } from "@/providers/CartProvider";
import { Address, ClaimMethod, Name, PaymentMethod } from "./Fields";
import { Button } from "@/shared/ui/button";

export type FormType = UseFormReturn<
  {
    name: string;
    claim_method: "DELIVERY";
    address: {
      street: string;
      city: string;
      landmark: string;
      barangay?: string | undefined;
      province?: string | undefined;
    };
    payment_method: "GCASH" | "BANK_TRANSFER";
  },
  any,
  undefined
>;

export default function OrderForm({}: {}) {
  const { user, isLoading } = useCurrentUser();
  const { cart } = useContext(CartContext);

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    claim_method: z.enum(["DELIVERY"]),
    address: z.object({
      street: z.string().min(1, {
        message: "Please enter a valid street name",
      }),
      barangay: z.string().optional(),
      city: z.string().min(1, {
        message: "Please select a city",
      }),
      province: z.string().optional(),
      landmark: z.string().min(1, { message: "Please enter a valid landmark" }),
    }),
    payment_method: z.enum(["GCASH", "BANK_TRANSFER"]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      name: user?.full_name || "",
      claim_method: "DELIVERY",
      payment_method: "GCASH",
      address: {
        city: "",
        street: "",
        barangay: "",
        province: "",
        landmark: "",
      },
    },
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  });

  const watchClaimMethod = form.watch("claim_method");

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  const { isValid, isValidating } = useFormState({ control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="pt-4 px-6 space-y-5">
          <Name form={form} />
          <ClaimMethod form={form} />
          {watchClaimMethod === "DELIVERY" ? <Address form={form} /> : null}
          <PaymentMethod form={form} />
        </div>
        <div className="px-5 pt-2 pb-10 text-left">
          <Button
            variant={"default"}
            className={`w-full my-2 ${
              isValid && !isValidating
                ? "opacity-100 pointer-events-auto cursor-pointer"
                : "opacity-30 pointer-events-none cursor-not-allowed"
            }`}
          >
            SUBMIT
          </Button>
          {/* <SendToMessenger
            className={`${
              isValid && !isValidating
                ? "opacity-100 pointer-events-auto cursor-pointer"
                : "opacity-30 pointer-events-none cursor-not-allowed"
            }`}
            onClickButton={async () => {}}
            onOptIn={async (ref) => {
              // Save order in database to fetch it from webhook endpoint
              const { name, address, claim_method, payment_method } =
                form.getValues();

              const createdOrder = await createOrderAction({
                details: {
                  ref,
                  customer_name: name,
                  delivery_address: getFullAddress(address) || "",
                  claim_method,
                  payment_method,
                  total_items: cart.total_items,
                  total_price: cart.total_amount,
                  landmark: address.landmark,
                },
                items: cart.cartItems,
              });

              if (createdOrder) window.location.reload();
            }}
          /> */}
          <div className="text-sm italic mt-1 text-left">
            You will receive a message from{" "}
            <Link
              target="_blank"
              href="https://www.facebook.com/lunalatteph"
              className="underline"
            >
              our FB page
            </Link>{" "}
            after submitting your order. Thank you and stay caffienated!
          </div>
        </div>
      </form>
    </Form>
  );
}
