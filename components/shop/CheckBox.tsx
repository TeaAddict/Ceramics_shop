"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Checkbox } from "@/components/ui/checkbox";

const CheckBox = ({
  initialState,
  setState,
  label,
  paramName,
}: {
  initialState: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  label: string;
  paramName: string;
}) => {
  const { lastParams, setLastParams } = useUpdateSearchParams();
  function handleChange(checked: boolean | "indeterminate") {
    setState((hideSoldOut: boolean) =>
      checked === "indeterminate" ? hideSoldOut : checked
    );
    setLastParams([{ name: paramName, value: String(checked) }]);
  }
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={label}
        onCheckedChange={handleChange}
        checked={initialState}
      />
      <label
        htmlFor={label}
        className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
