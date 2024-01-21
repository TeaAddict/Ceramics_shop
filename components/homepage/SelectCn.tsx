import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCn() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sorting options" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="date-asc">Date: newest first</SelectItem>
          <SelectItem value="date-desc">Date: oldest first</SelectItem>
          <SelectItem value="price-asc">Price: lowest first</SelectItem>
          <SelectItem value="price-desc">Price: highest first</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
