import { useEffect, useState } from "react";

export function useImgBlobUrl(
  images: FileList | File[] | string[] | string | undefined | null
) {
  const [imgBlobUrl, setImgBlobUrl] = useState<string[]>([]);

  useEffect(() => {
    if (!images) {
      setImgBlobUrl([]);
      return;
    }
    if (typeof images === "string") return setImgBlobUrl([images]);
    if (
      Array.isArray(images) &&
      images.every((item) => typeof item === "string")
    ) {
      return setImgBlobUrl(images);
    }

    const urls: string[] = Array.from(images).map((image) => {
      return URL.createObjectURL(image);
    });
    setImgBlobUrl(urls);
    return () => {
      // urls.forEach((url) => URL.revokeObjectURL(url));
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);
  return imgBlobUrl;
}
