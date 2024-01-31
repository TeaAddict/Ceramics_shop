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
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TItemSchema, itemSchema } from "@/lib/types";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { getImagesWithDimensions } from "@/utils/helper";

export function NewItemModal() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<FileList>();
  const [processedImages, setProcessedImages] = useState<string[]>();
  const [customError, setCustomError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    watch,
    control,
  } = useForm<TItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      price: undefined,
      stock: undefined,
      category: "",
      description: "",
      thumbnailPicture: "",
    },
  });

  const thumbnailPicture = watch("thumbnailPicture");

  useEffect(() => {
    if (!images || images.length === 0) {
      setValue("thumbnailPicture", "");
      setCustomError("");
      return;
    } else if (images.length === 1) {
      setValue("thumbnailPicture", images[0].name);
    }

    // Show images in form
    let tmp: string[] = [];
    Array.from(images).map((image) => tmp.push(URL.createObjectURL(image)));
    setProcessedImages(tmp);
    Array.from(tmp).map((imgUrl) => {
      return () => {
        URL.revokeObjectURL(imgUrl);
      };
    });
  }, [images, setValue]);

  async function onSubmit(formData: TItemSchema) {
    const pictureArray = await getImagesWithDimensions(formData.pictures);

    let data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price.toString());
    data.append("stock", formData.stock.toString());
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("thumbnailPicture", formData.thumbnailPicture);
    pictureArray.map((picture, index) => {
      data.append(`picture${index}`, picture.picture);
      data.append(`picture${index}`, JSON.stringify(picture.dimensions));
    });

    const response = await fetch("/api/item", {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

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
      } else if (errors.customError) {
        setCustomError(errors.customError);
      } else {
        alert("Something went wrong!");
      }
    }

    if (responseData.success) {
      reset();
      setOpen(false);
      setCustomError("");
    }
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
            <Input {...register("title")} id="title" className="col-span-3" />
            {errors.title && (
              <p className="text-destructive col-span-3">{`${errors.title.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Price</p>
            <Input {...register("price")} id="price" className="col-span-3" />
            {errors.price && (
              <p className="text-destructive col-span-3">{`${errors.price.message}`}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Stock</p>
            <Input
              {...register("stock")}
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
              {...register("category")}
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
            <p>Pictures</p>
            <Input
              {...register("pictures")}
              id="pictures"
              type="file"
              accept="image/*"
              multiple
              className="col-span-3"
              onChange={(e) => setImages(e.target.files ?? undefined)}
            />
            {errors.pictures && (
              <p className="text-destructive col-span-3">{`${errors.pictures.message}`}</p>
            )}
          </div>

          {images && images.length > 0 && processedImages && (
            <Controller
              control={control}
              name="thumbnailPicture"
              render={(field) => (
                <div className="space-y-2">
                  <p>Thumbnail picture</p>
                  <ScrollArea className="flex justify-center h-64">
                    <div className="grid grid-cols-2">
                      {processedImages.map((image, index) => (
                        <div
                          onClick={() =>
                            setValue("thumbnailPicture", images[index].name)
                          }
                          className={`w-auto aspect-square relative hover:brightness-50 ${
                            thumbnailPicture === images[index]?.name &&
                            "border-4 border-primary"
                          }`}
                          key={image}
                        >
                          <Image
                            alt=""
                            fill
                            src={image}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {errors.thumbnailPicture && (
                    <p className="text-destructive col-span-3">{`${errors.thumbnailPicture.message}`}</p>
                  )}
                </div>
              )}
            />
          )}
          <DialogFooter>
            {customError && (
              <p className="text-destructive col-span-3">{customError}</p>
            )}
            <Button type="submit">Add item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
