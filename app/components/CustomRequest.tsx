"use client";

import { Button } from "@/shared_components/ui/button";
import { GrabIcon, XIcon } from "lucide-react";
import { useState } from "react";

export interface CustomRequestProps {
  id: number;
  message: string;
  color: string;
}

const customRequests = [
  {
    id: 1,
    message: "I want it creamier!",
    color: "light",
  },
  {
    id: 2,
    message: "I want it sweeter!",
    color: "sweet",
  },
  {
    id: 3,
    message: "I want less stronger coffee!",
    color: "light-brown",
  },
  {
    id: 4,
    message: "I want stronger coffee!",
    color: "dark-brown",
  },
];

export default function CustomRequest({
  isDisabled = true,
  selectedRequest = null,
  setSelectedRequest = (request: CustomRequestProps | null) => {},
}: {
  isDisabled: boolean;
  selectedRequest: CustomRequestProps | null;
  setSelectedRequest: (request: CustomRequestProps | null) => void;
}) {
  return (
    <div className="custom-request">
      <div className="flex items-center gap-2">
        <label
          htmlFor="custom-request"
          className={`flex gap-2 items-center ${
            isDisabled ? "text-neutral-400" : ""
          }`}
        >
          <GrabIcon /> Make it yours:
        </label>
        <p
          className={`font-bold ${
            selectedRequest ? "underline decoration-dashed" : ""
          }`}
        >
          {selectedRequest?.message || "_ _ _ _ _"}
        </p>
        {selectedRequest ? (
          <Button
            type="button"
            className="ml-5"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setSelectedRequest(null)}
          >
            <XIcon />
          </Button>
        ) : null}
        <input
          disabled={isDisabled}
          type="hidden"
          id="custom-request"
          name="custom-request"
          value={selectedRequest?.message || ""}
          onChange={() => {}}
        />
      </div>

      <div className="selection mt-5 pl-5 flex flex-col gap-6 items-start">
        {customRequests.map((request) => (
          <Button
            key={request.id}
            type="button"
            variant={request.color as "default"}
            className="rounded-full sm:text-base md:text-lg"
            disabled={isDisabled}
            onClick={() => {
              setSelectedRequest(request);
            }}
          >
            {request.message}
          </Button>
        ))}
      </div>
    </div>
  );
}
