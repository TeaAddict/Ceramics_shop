import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, TItemSchema, itemSchema } from "@/lib/types";
import { getImagesWithDimensions } from "@/utils/helper";
import ImageDrop from "./imageFeature/ImageDrop";
import { getPictures } from "./imageFeature/getPictures";

const EditItemForm = ({
  item,
  setOpen,
}: {
  item: ProductSchema;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isEdit = item ? true : false;
  console.log(isEdit);
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
    getValues,
    trigger,
  } = useForm<TItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: async () => {
      if (isEdit) {
        const res = await getPictures(item);
        return {
          title: item.title,
          price: item.price,
          stock: item.stock,
          category: item.category,
          description: item.description,
          thumbnailPicture: item.thumbnail.name,
          pictures: res,
        };
      } else {
        return {
          title: "",
          price: 0,
          stock: 0,
          category: "",
          description: "",
          thumbnailPicture: "",
          pictures: null,
        };
      }
    },
  });

  const thumbnailPicture = watch("thumbnailPicture");

  async function onSubmit(formData: TItemSchema) {
    console.log(formData);

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

    let response;
    if (isEdit) {
      response = await fetch(`/api/admin/item/${item.id}`, {
        method: "PUT",
        body: data,
      });
    } else {
      response = await fetch(`/api/shop`, {
        method: "POST",
        body: data,
      });
    }
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      // TODO change into nice toast
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
        <Input {...register("category")} id="category" className="col-span-3" />
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
      <ImageDrop
        item={item}
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        thumbnailPicture={thumbnailPicture}
        trigger={trigger}
        getValues={getValues}
      />
      {customError && (
        <p className="text-destructive col-span-3">{customError}</p>
      )}
      <Button disabled={isSubmitting} type="submit">
        Edit item
      </Button>
    </form>
  );
};

export default EditItemForm;
