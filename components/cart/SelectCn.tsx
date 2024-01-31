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
}: {
  color?: "default" | "inverted";
}) {
  const [currentSelection, setCurrentSelection] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

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
          <SelectItem value="price-asc">Price: lowest first</SelectItem>
          <SelectItem value="price-desc">Price: highest first</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
