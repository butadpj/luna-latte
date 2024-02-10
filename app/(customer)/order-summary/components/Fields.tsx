import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { FormType } from "./OrderForm";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import cities from "@/lib/cities";

export function Name({ form }: { form: FormType }) {
  return (
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
  );
}

export function ClaimMethod({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="claim_method"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>Claim method</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="DELIVERY">Delivery</SelectItem>
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
  );
}

export function Address({ form }: { form: FormType }) {
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
  return (
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
              <FormLabel className="font-light text-xs">Province: </FormLabel>
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
  );
}

export function PaymentMethod({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="payment_method"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>Payment method</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Cash on Delivery (COD)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* <SelectItem value="cod">Cash on Delivery (COD)</SelectItem> */}
                <SelectItem value="GCASH">Gcash</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {/* <FormDescription>Up to you!</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
