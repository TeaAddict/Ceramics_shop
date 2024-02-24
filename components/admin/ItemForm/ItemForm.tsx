import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, TItemSchema, itemSchema } from "@/lib/types";
import { getImagesWithDimensions } from "@/utils/helper";
import ImageDrop from "./imageFeature/ImageDrop";
import { getPictures } from "./imageFeature/getPictures";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, updateItem } from "@/utils/itemFunctions";
import { setFormError } from "./setFormError";

const ItemForm = ({
  item,
  setOpen,
}: {
  item?: ProductSchema;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const isEdit = item ? true : false;
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
          price: 1,
          stock: 1,
          category: "",
          description: "",
          thumbnailPicture: "",
          pictures: null,
        };
      }
    },
  });
  const mutationAddItem = useMutation({
    mutationFn: (data: FormData) => addItem(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      if (data.errors) setFormError(setError, data.errors);
      if (data.success) {
        setOpen(false);
        reset();
      }
    },
  });
  const mutationUpdateItem = useMutation({
    mutationFn: (data: { data: FormData; id: string }) => updateItem(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      if (data.errors) setFormError(setError, data.errors);
      if (data.success) {
        setOpen(false);
        reset();
      }
    },
  });
  const watchValues = watch(["thumbnailPicture", "pictures"]);
  const initPictures = getValues("pictures");

  async function onSubmit(formData: TItemSchema) {
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

    if (isEdit && item) {
      mutationUpdateItem.mutate({ data: data, id: item.id });
    } else {
      mutationAddItem.mutate(data);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[90vh] flex flex-col gap-5"
    >
      <ScrollArea className="flex flex-col">
        <div className="flex flex-col gap-5 p-1">
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
        </div>
      </ScrollArea>
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
