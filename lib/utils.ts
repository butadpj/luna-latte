import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalStorageItem = (key = "") => {
  if (key) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
};

export const setLocalStorageItem = (key = "", value: unknown) => {
  if (key && value) {
    if (typeof value === "object")
      return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export function formatDate(date = "") {
  if (!date) return null;

  return new Date(date).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export function formatPrice(
  price: number,
  options: { withoutTag?: boolean; withoutDecimals?: boolean } = {
    withoutTag: false,
    withoutDecimals: false,
  }
) {
  if (options.withoutTag) {
    if (options.withoutDecimals)
      return new Intl.NumberFormat("en-US").format(price);

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    if (options.withoutDecimals)
      return `₱${new Intl.NumberFormat("en-US").format(price)}`;

    return `₱${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)}`;
  }
}

export function getFullAddress(address: {
  street: string;
  city: string;
  barangay?: string | undefined;
  province?: string | undefined;
}) {
  if (address.street && address.barangay && address.city && address.province)
    return `${address.street}, ${address.barangay}, ${address.city}, ${address.province}`;

  if (address.street && address.city && address.province)
    return `${address.street}, ${address.city}, ${address.province}`;

  return null;
}

export function extractNumberFromString(text: string) {
  const matched = text.match(/\d+/);

  if (!matched?.length)
    throw new Error("Can't find any number from the given text");

  const number = parseInt(matched[0], 10);
  return isNaN(number) ? null : number;
}

export function displaySizeName(sizeName: string) {
  return `${extractNumberFromString(sizeName)} ml`;
}
