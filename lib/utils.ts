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
