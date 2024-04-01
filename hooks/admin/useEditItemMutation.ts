import { setFormError } from "@/components/admin/ItemForm/setFormError";
import { updateItem } from "@/utils/itemFunctions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import useCurrentLanguage from "../useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

type MyFormData = {
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnailPicture: string;
  description?: string | undefined;
  pictures?: any;
};

export function useEditItemMutation(
  queryClient: QueryClient,
  reset: UseFormReset<MyFormData>,
  setError: UseFormSetError<MyFormData>,
  setOpen: (value: SetStateAction<boolean>) => void
) {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { data: FormData; id: string }) =>
      await updateItem(data),
    onSuccess: async (data) => {
      if (data.errors) {
        setFormError(setError, data.errors);
        toast.error(t("toast.errorEdit"));
        return false;
      }
      if (data.success) {
        setOpen(false);
        reset();
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        router.refresh();
        toast.success(t("toast.successEdit"));
        return true;
      }
      toast.error(t("toast.errorEdit"));
      return false;
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}
