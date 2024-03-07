import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface InputProps {
  selectOptions: { name: string; value: string }[];
  color?: "default" | "inverted";
  initialSelection?: string;
  placeholder?: string;
  selectLabel?: string;
  onChange: (...event: any[]) => void;
}

export function SelectCn({
  onChange,
  color = "default",
  selectOptions,
  initialSelection,
  placeholder = "Select",
  selectLabel = "",
}: InputProps) {
  const [currentSelection, setCurrentSelection] = useState(
    initialSelection ?? ""
  );

  function handleChange(e: string) {
    setCurrentSelection(e);
    onChange(e);
  }

  return (
    <Select value={currentSelection} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[180px] ${color === "inverted" && "bg-background"}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {selectOptions.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
