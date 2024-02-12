import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SelectCn({
  color = "default",
  selectOptions,
  initialSelection,
}: {
  color?: "default" | "inverted";
  selectOptions: { name: string; value: string }[];
  initialSelection?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [currentSelection, setCurrentSelection] = useState(
    initialSelection ?? ""
  );

  function handleChange(value: string) {
    setCurrentSelection(value);
    const res = new URLSearchParams(params);
    res.set("sortBy", value);
    router.push(`${pathname}?${res.toString()}`);
  }

  return (
    <Select value={currentSelection} onValueChange={(e) => handleChange(e)}>
      <SelectTrigger
        className={`w-[180px] ${color === "inverted" && "bg-background"}`}
      >
        <SelectValue placeholder="Sorting options" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
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
