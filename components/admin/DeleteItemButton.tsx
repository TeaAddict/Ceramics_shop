import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/utils/itemFunctions";
import toast from "react-hot-toast";

const DeleteItemButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Successfully deleted item!");
    },
    onError: () => {
      toast.error("Problem deleting item");
    },
  });

  async function handleClick() {
    mutation.mutate(id);
  }
  return (
    <Button onClick={() => handleClick()} variant={"destructive"}>
      Delete
    </Button>
  );
};

export default DeleteItemButton;
