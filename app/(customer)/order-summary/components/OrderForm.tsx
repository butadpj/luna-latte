"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { Label } from "@/shared/ui/label";
import cities from "@/lib/cities";
import { useUser } from "@clerk/nextjs";
import SendToMessenger from "@/shared/SendToMessenger";

export default function OrderForm({
  submitButton = null,
}: {
  submitButton: JSX.Element | null;
}) {
  const { user } = useUser();

  const [selectedClaimMethod, setSelectedClaimMethod] =
    useState<string>("delivery");

  const [selectedCity, setSelectedCity] = useState<string | null>("");

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    claim_method: z.string(),

    ...(selectedClaimMethod === "delivery" && {
      address: z.object({
        street: z.string().min(1, {
          message: "Please enter a valid street name",
        }),
        barangay: z.string().optional(),
        city: z.string().min(1, {
          message: "Please select a city",
        }),
        province: z.string().optional(),
      }),
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

  const getProvinceFromSelectedCity = () => {
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      name: user?.fullName || "",
      claim_method: "delivery",
      payment_method: "cod",
      address: {
        city: selectedCity,
        province: getProvinceFromSelectedCity(),
      },
    },
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} />
              </FormControl>
              <FormDescription>We would like to know you!</FormDescription>
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
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedClaimMethod(value);
                  }}
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
              <FormDescription>
                How would like to get your drinks?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedClaimMethod === "delivery" ? (
          <div className="flex flex-col items-start">
            <Label className="mb-2">Address</Label>
            <div className="fields w-full space-y-2">
              <FormField
                control={form.control}
                name={"address.street"}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="font-light text-xs">
                      Street:
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
                    <FormLabel className="font-light text-xs">City:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCity(value);
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
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cash on Delivery (COD)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
                    <SelectItem value="gcash">Gcash</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Up to you!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitButton}
        {/* <SendToMessenger /> */}

        {/* <Button type="submit" size={"lg"}></Button> */}
      </form>
    </Form>
  );
}
