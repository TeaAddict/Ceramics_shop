import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Controller,
  Control,
  UseFormSetValue,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import SelectedImages from "../SelectedImages";
import { ProductSchema, TItemInDb, TItemSchema } from "@/lib/types";
import { useImgBlobUrl } from "@/hooks/admin/useImgBlobUrl";
import { useImageFiles } from "../useImageFiles";

type Props = {
  item: TItemInDb;
  register: UseFormRegister<TItemSchema>;
  errors: FieldErrors<FieldValues>;
  control: Control<TItemSchema>;
  setValue: UseFormSetValue<TItemSchema>;
  thumbnailPicture: string;
  trigger: UseFormTrigger<TItemSchema>;
  getValues: UseFormGetValues<TItemSchema>;
};

const ImageDrop = (props: Props) => {
  const {
    item,
    register,
    errors,
    control,
    setValue,
    thumbnailPicture,
    trigger,
    getValues,
  } = props;

  const [images, setImages] = useState<FileList | File[] | null>(null);

  const { imgBlobUrl, setImgBlobUrl } = useImgBlobUrl(images);

  const { data: imgFiles } = useImageFiles(item);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImages(e.target.files);

    if (e.target.files?.length === 1)
      setValue("thumbnailPicture", e.target.files[0].name);
  }

  useEffect(() => {
    if (imgFiles && imgFiles.length) {
      setImages(imgFiles);
    }
  }, [imgFiles]);

  return (
    <div className="grid grid-cols-4 items-center gap-4 border-2 p-1">
      <p>Pictures</p>
      <Input
        {...register("pictures")}
        id="pictures"
        type="file"
        accept="image/*"
        multiple
        className="col-span-3"
        onChange={(e) => handleImageChange(e)}
      />
      {errors.pictures && (
        <p className="text-destructive col-span-4">{`${errors.pictures.message}`}</p>
      )}

      {imgBlobUrl && images && (
        <Controller
          control={control}
          name="thumbnailPicture"
          render={(field) => (
            <div className="space-y-2 col-span-4">
              <p>Thumbnail with pictures</p>
              <SelectedImages
                images={images}
                imgBlobUrl={imgBlobUrl}
                setValue={setValue}
                thumbnailPicture={thumbnailPicture}
              />
              {errors.thumbnailPicture && (
                <p className="text-destructive col-span-4">{`${errors.thumbnailPicture.message}`}</p>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ImageDrop;
