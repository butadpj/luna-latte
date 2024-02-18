import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getOrderByRef } from "./queries/orders";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl() {
  if (process.env.VERCEL_ENV === "development") {
    return "https://de18-136-158-11-115.ngrok-free.app";
  }

  return "https://www.luna-latte.cafe";
}

export const getLocalStorageItem = (key = "") => {
  if (key) {
    const item = window.localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (err) {
        return item;
      }
    }
    return null;
  }
};

export const setLocalStorageItem = (key = "", value: unknown) => {
  if (key && value) {
    if (typeof value === "object")
      return window.localStorage.setItem(key, JSON.stringify(value));

    if (typeof value === "string")
      return window.localStorage.setItem(key, value);
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

export interface Message {
  text?: string;
  attachment?: {
    type: "audio" | "file" | "image" | "template" | "video";
    payload: {
      template_type?: "button";
      text?: string;
      url?: string;
      is_reusable?: boolean;
      buttons?: {
        type: "postback" | "web_url";
        url?: string;
        title: string;
        webview_height_ratio: "compact" | "tall" | "full";
      }[];
    };
  };
  quick_replies?: {
    content_type: string;
    title: string;
    payload: string;
  }[];
}

export async function sendMessageApi({
  recipientId,
  message,
  messagingType,
  sender_action,
}: {
  message?: Message;
  messagingType?: "RESPONSE" | "UPDATE";
  recipientId: string;
  sender_action?: "typing_on" | "typing_off" | "mark_seen";
}) {
  // const items = order?.items.map((item) => ({
  //   title: item.name,
  //   subtitle: `Milk: Regular; Request: Nothing, I'm good!`,
  //   quantity: item.quantity,
  //   currency: "PHP",
  //   price: item.price,
  //   image_url: "http://originalcoastclothing.com/img/whiteshirt.png",
  // }));

  // const template = {
  //   attachment: {
  //     type: "template",
  //     payload: {
  //       template_type: "receipt",
  //       recipient_name: order?.customer_name,
  //       order_number: order?.id,
  //       currency: "PHP",
  //       payment_method: order?.payment_method,
  //       order_url: "http://luna-latte.vercel.app",
  //       timestamp: parseInt(new Date(order?.created_at).getTime() / 1000),
  //       summary: {
  //         subtotal: order?.total_price,
  //         shipping_cost: 50,
  //         total_cost: order?.total_price + 50,
  //       },
  //       // adjustments: [
  //       //   {
  //       //     name: "New Customer Discount",
  //       //     amount: 20,
  //       //   },
  //       //   {
  //       //     name: "$10 Off Coupon",
  //       //     amount: 10,
  //       //   },
  //       // ],
  //       elements: items,
  //     },
  //   },
  // };

  const response = await (
    await fetch(
      `https://graph.facebook.com/v18.0/155078761029891/messages?recipient={'id': ${recipientId}}&${
        messagingType ? `messaging_type=${messagingType}` : ""
      }&${
        sender_action
          ? `sender_action=${sender_action}`
          : `message=${JSON.stringify(message)}`
      }&access_token=${process.env.PAGES_ACCESS_TOKEN}`,
      {
        method: "POST",
      }
    )
  ).json();

  return response;
}
