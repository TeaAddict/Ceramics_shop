import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/utils/itemFunctions";
import toast from "react-hot-toast";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

const DeleteItemButton = ({ id }: { id: string }) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "shop");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
        refetchType: "active",
      });
      toast.success(t("toast.successDelete"));
    },
    onError: () => {
      toast.error(t("toast.errorDelete"));
    },
  });

  async function handleClick() {
    mutation.mutate(id);
  }
  return (
    <Button
      onClick={() => handleClick()}
      variant={"destructive"}
      disabled={mutation.isPending}
    >
      {t("delete")}
    </Button>
  );
};

export default DeleteItemButton;
