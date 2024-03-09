"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

export function CheckBox({
  handler,
  children,
}: {
  handler: (checked: boolean | "indeterminate") => void;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" onCheckedChange={handler} />
      <label
        htmlFor="terms"
        className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
}
