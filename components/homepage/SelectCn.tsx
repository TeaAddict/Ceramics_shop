import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCn({
  color = "default",
}: {
  color?: "default" | "inverted";
}) {
  return (
    <Select>
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
