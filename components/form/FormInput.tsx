import React from "react";
import { Input } from "../ui/input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  labelSize?: "1" | "2" | "3";
  inputSize?: "1" | "2" | "3";
  isSubmitting?: boolean;
  type?: string;
}

const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  labelSize = "1",
  inputSize = "3",
  isSubmitting = false,
  type = "text",
}: InputProps<T>) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-4 items-start md:items-center md:gap-4">
      <p
        className="capitalize"
        style={{ gridColumn: `span ${labelSize} / span 1` }}
      >
        {label}
      </p>
      <Input
        {...register(name, { valueAsNumber: type === "number" })}
        id={name}
        style={{ gridColumn: `span ${inputSize} / span 1` }}
        disabled={isSubmitting}
        type={type}
      />
      {errors.name && (
        <p className="text-destructive col-span-3">{`${errors.name.message}`}</p>
      )}
    </div>
  );
};

export default FormInput;
