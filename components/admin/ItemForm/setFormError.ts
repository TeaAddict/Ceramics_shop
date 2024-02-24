import { TItemSchema } from "@/lib/types";
import { UseFormSetError } from "react-hook-form";

export function setFormError(
  setError: UseFormSetError<TItemSchema>,
  errors: any
) {
  console.log(errors);
  if (errors.title) {
    setError("title", {
      type: "server",
      message: errors.title,
    });
  } else if (errors.price) {
    setError("price", {
      type: "server",
      message: errors.price,
    });
  } else if (errors.stock) {
    setError("stock", {
      type: "server",
      message: errors.stock,
    });
  } else if (errors.category) {
    setError("category", {
      type: "server",
      message: errors.category,
    });
  } else if (errors.description) {
    setError("description", {
      type: "server",
      message: errors.description,
    });
  } else if (errors.pictures) {
    setError("pictures", {
      type: "server",
      message: errors.pictures,
    });
  } else {
    //TODO add toast
    alert("Something went wrong!");
  }
}
