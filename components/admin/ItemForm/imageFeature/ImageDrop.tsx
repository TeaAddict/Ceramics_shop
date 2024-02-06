import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
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
import { ProductSchema, TItemSchema } from "@/lib/types";
import { useImgBlobUrl } from "@/hooks/admin/useImgBlobUrl";
import { useImageFiles } from "../useImageFiles";

type Props = {
  initPictures: FileList | File[] | undefined | null;
  item?: ProductSchema;
  register: UseFormRegister<TItemSchema>;
  errors: FieldErrors<FieldValues>;
  control: Control<TItemSchema>;
  setValue: UseFormSetValue<TItemSchema>;
  watchValues: [string, any];
  trigger: UseFormTrigger<TItemSchema>;
  getValues: UseFormGetValues<TItemSchema>;
};

const ImageDrop = (props: Props) => {
  const {
    item,
    initPictures,
    register,
    errors,
    control,
    setValue,
    watchValues,
    trigger,
    getValues,
  } = props;

  const [images, setImages] = useState<FileList | File[] | undefined | null>(
    initPictures
  );

  const { imgBlobUrl } = useImgBlobUrl(images);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setImages(e.target.files);
    } else {
      setImages(null);
    }

    if (e.target.files?.length === 1) {
      setValue("thumbnailPicture", e.target.files[0].name);
    } else {
      setValue("thumbnailPicture", "");
    }
  }

  useEffect(() => {
    // console.log(watchValues[1]);
    setImages(watchValues[1]);
  }, [watchValues]);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <p>Pictures</p>
      <Input
        {...register("pictures", {
          onChange: (e) => handleImageChange(e),
        })}
        id="pictures"
        type="file"
        accept="image/*"
        multiple
        className="col-span-3"
      />
      {errors.pictures && (
        <p className="text-destructive col-span-4">{`${errors.pictures.message}`}</p>
      )}

      {imgBlobUrl && images && (
        <div className="space-y-2 col-span-4">
          <p>Thumbnail with pictures</p>
          <SelectedImages
            images={images}
            imgBlobUrl={imgBlobUrl}
            setValue={setValue}
            thumbnailPicture={watchValues[0]}
          />
          {errors.thumbnailPicture && (
            <p className="text-destructive col-span-4">{`${errors.thumbnailPicture.message}`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDrop;
