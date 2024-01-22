import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { FieldValues, useForm } from "react-hook-form";
import React, { useState } from "react";

export function NewItemModal() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  async function onSubmit(data: FieldValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          disabled={isSubmitting}
          variant="default"
        >
          Add new item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Title</p>
            <Input
              {...register("title", {
                required: "Title is required",
              })}
              id="title"
              className="col-span-3"
            />
            {errors.title && (
              <p className="text-destructive col-span-3">{`${errors.title.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Price</p>
            <Input
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Enter valid price, e.g. 11.99",
                },
              })}
              id="price"
              className="col-span-3"
            />
            {errors.price && (
              <p className="text-destructive col-span-3">{`${errors.price.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Stock</p>
            <Input
              {...register("stock", {
                required: "Stock is required",
              })}
              type="number"
              id="stock"
              className="col-span-3"
            />
            {errors.stock && (
              <p className="text-destructive col-span-3">{`${errors.stock.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Category</p>
            <Input
              {...register("category", {
                required: "Category is required",
              })}
              id="category"
              className="col-span-3"
            />
            {errors.category && (
              <p className="text-destructive col-span-3">{`${errors.category.message}`}</p>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <p>Description</p>
            <Textarea {...register("description")} id="description" />
            {errors.description && (
              <p className="text-destructive col-span-3">{`${errors.description.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Picture</p>
            <Input
              {...register("picture", {
                required: "Picture is required",
              })}
              id="picture"
              type="file"
              className="col-span-3"
            />
            {errors.picture && (
              <p className="text-destructive col-span-3">{`${errors.picture.message}`}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Add item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
