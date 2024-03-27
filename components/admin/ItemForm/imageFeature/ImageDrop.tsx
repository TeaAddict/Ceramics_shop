import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import SelectedImages from "../SelectedImages";
import { TItemSchema } from "@/lib/types";
import { useImgBlobUrl } from "@/hooks/admin/useImgBlobUrl";

type Props = {
  initPictures: string[] | undefined | null;
  register: UseFormRegister<TItemSchema>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<TItemSchema>;
  watchValues: [string, any];
  isLoading?: boolean;
};

const ImageDrop = (props: Props) => {
  const { initPictures, register, errors, setValue, watchValues, isLoading } =
    props;

  const [images, setImages] = useState<
    FileList | File[] | string[] | undefined | null
  >(initPictures);

  const imgBlobUrl = useImgBlobUrl(images);

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
        disabled={isLoading}
        type="file"
        accept="image/*"
        multiple
        className="col-span-3"
      />
      {errors.pictures && (
        <p className="text-destructive col-span-4">{`${errors.pictures.message}`}</p>
      )}
      {imgBlobUrl.length && images ? (
        <div className="space-y-2 col-span-4">
          <p>Thumbnail with pictures</p>
          <SelectedImages
            images={images}
            imgBlobUrl={imgBlobUrl}
            setValue={setValue}
            thumbnailPicture={watchValues[0]}
            isLoading={isLoading}
          />
          {errors.thumbnailPicture && (
            <p className="text-destructive col-span-4">{`${errors.thumbnailPicture.message}`}</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ImageDrop;
