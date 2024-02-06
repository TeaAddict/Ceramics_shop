import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, TItemSchema, itemSchema } from "@/lib/types";
import { getImagesWithDimensions } from "@/utils/helper";
import ImageDrop from "./imageFeature/ImageDrop";
import { getPictures } from "./imageFeature/getPictures";

const ItemForm = ({
  item,
  setOpen,
}: {
  item?: ProductSchema;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isEdit = item ? true : false;
  const [customError, setCustomError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
    setValue,
    watch,
    getValues,
  } = useForm<TItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: async () => {
      if (isEdit) {
        const res = await getPictures(item);
        return {
          title: item?.title ?? "",
          price: item?.price ?? 1,
          stock: item?.stock ?? 1,
          category: item?.category ?? "",
          description: item?.description ?? "",
          thumbnailPicture: item?.thumbnail.name ?? "",
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
  const watchValues = watch(["thumbnailPicture", "pictures"]);
  const initPictures = getValues("pictures");

  async function onSubmit(formData: TItemSchema) {
    console.log(formData);
    const pictureArray = await getImagesWithDimensions(formData.pictures);

    let data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price.toString());
    data.append("stock", formData.stock.toString());
    data.append("category", formData.category);
    data.append("description", formData.description ?? "");
    data.append("thumbnailPicture", formData.thumbnailPicture);
    pictureArray.map((picture, index) => {
      data.append(`picture${index}`, picture.picture);
      data.append(`picture${index}`, JSON.stringify(picture.dimensions));
    });

    let response;
    if (isEdit) {
      response = await fetch(`/api/admin/item/${item?.id}`, {
        method: "PUT",
        body: data,
      });
    } else {
      response = await fetch(`/api/admin/item`, {
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
      setOpen(false);
      setCustomError("");
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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

      {isEdit && initPictures && (
        <ImageDrop
          initPictures={initPictures}
          errors={errors}
          register={register}
          setValue={setValue}
          watchValues={watchValues}
        />
      )}

      {!isEdit && (
        <ImageDrop
          initPictures={initPictures}
          errors={errors}
          register={register}
          setValue={setValue}
          watchValues={watchValues}
        />
      )}
      {customError && (
        <p className="text-destructive col-span-3">{customError}</p>
      )}
      <div className="flex justify-around">
        <Button
          disabled={isSubmitting}
          onClick={() => {
            reset();
          }}
          type="button"
          variant={"secondary"}
        >
          Reset form
        </Button>
        <Button disabled={isSubmitting} type="submit">
          {isEdit ? "Edit item" : "Add item"}
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
