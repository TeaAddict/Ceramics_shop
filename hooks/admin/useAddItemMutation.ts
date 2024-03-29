import { setFormError } from "@/components/admin/ItemForm/setFormError";
import { addItem } from "@/utils/itemFunctions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

type MyFormData = {
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnailPicture: string;
  description?: string | undefined;
  pictures?: any;
};

export function useAddItemMutation(
  queryClient: QueryClient,
  reset: UseFormReset<MyFormData>,
  setError: UseFormSetError<MyFormData>,
  setOpen: (value: SetStateAction<boolean>) => void
) {
  return useMutation({
    mutationFn: async (data: { data: FormData; images: FileList }) =>
      await addItem(data.data),
    onSuccess: async (data) => {
      if (data.errors) {
        console.log(data.errors, "ERRORS OF FORM");
        setFormError(setError, data.errors);
        toast.error("Problem adding item");
      }
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        setOpen(false);
        reset();
        toast.success("Successfully added item!");
      }
    },
  });
}
