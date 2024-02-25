import { useEffect, useState } from "react";

export function useImgBlobUrl(images: FileList | File[] | undefined | null) {
  const [imgBlobUrl, setImgBlobUrl] = useState<string[]>([]);

  useEffect(() => {
    if (!images) {
      setImgBlobUrl([]);
      return;
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
