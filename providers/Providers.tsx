"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./CartProvider";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}
