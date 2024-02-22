import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/utils/itemFunctions";

const DeleteItemButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
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
