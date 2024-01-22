"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { toast } from "@/shared/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import cities from "@/lib/cities";
import { useUser } from "@clerk/nextjs";
import SendToMessenger from "@/shared/SendToMessenger";
import { Button } from "@/shared/ui/button";
import { Facebook, FacebookIcon } from "lucide-react";
import Link from "next/link";

export default function OrderForm({}: {}) {
  const { user } = useUser();

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    claim_method: z.string(),
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
    payment_method: z.string(),
  });

  const validCities = cities
    .filter((city) => city.province === "MM" || city.province === "RIZ")
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      name: user?.fullName || "",
      claim_method: "delivery",
      payment_method: "gcash",
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

  const getProvinceFromSelectedCity = (selectedCity = "") => {
    const foundCity = validCities.find((city) => city.name === selectedCity);

    if (foundCity) {
      switch (foundCity.province) {
        case "RIZ":
          return "Rizal";
        case "MM":
          return "Metro Manila";
        default:
          return "Rizal";
      }
    }

    return undefined;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // setLocalStorageItem("order", data);
  }

  const { isValid, isValidating } = useFormState({ control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="py-4 px-6 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>
                  Name<span className="text-red-500">*</span>:{" "}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                {/* <FormDescription className="text-xs">
                  We would like to know you!
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="claim_method"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Claim method</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="pick-up">Pick up</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                  How would you like to get your drinks?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchClaimMethod === "delivery" ? (
            <div className="flex flex-col items-start">
              <Label className="mb-2">Address</Label>
              <div className="fields w-full space-y-2">
                <FormField
                  control={form.control}
                  name={"address.street"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="font-light text-xs">
                        Street<span className="text-red-500">*</span>:
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Sampaguita St." {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"address.barangay"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="font-light text-left text-xs">
                        Barangay (optional):
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Bagong Nayon" {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"address.city"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="font-light text-xs">
                        City<span className="text-red-500">*</span>:
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue(
                              "address.province",
                              getProvinceFromSelectedCity(value)
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {validCities.map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"address.province"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="font-light text-xs">
                        Province:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="This will be auto selected"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"address.landmark"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="font-light text-xs">
                        Landmark<span className="text-red-500">*</span>:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ) : null}

          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Payment method</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Cash on Delivery (COD)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value="cod">Cash on Delivery (COD)</SelectItem> */}
                      <SelectItem value="gcash">Gcash</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription>Up to you!</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="bg-light px-5 py-2">
          <SendToMessenger
            className={`${
              isValid && !isValidating
                ? "opacity-100 pointer-events-auto cursor-pointer"
                : "opacity-30 pointer-events-none cursor-not-allowed"
            }`}
            onClickButton={async () => {
              const data = form.getValues();

              toast({
                title: "You submitted the following values:",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(data, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
            onOptIn={async () => {
              // Save order in database to fetch it from webhook endpoint
            }}
          />
          <div className="text-dark text-sm italic mt-1 text-left">
            You will receive a message from{" "}
            <Link
              target="_blank"
              href="https://www.facebook.com/lunalatteph"
              className="underline"
            >
              Luna Latte FB page
            </Link>{" "}
            for order confirmation. Thank you and stay caffienated!
          </div>
        </div>
      </form>
    </Form>
  );
}
