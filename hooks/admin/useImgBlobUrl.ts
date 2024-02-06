import { useEffect, useState } from "react";

export function useImgBlobUrl(images: FileList | File[] | undefined | null) {
  const [imgBlobUrl, setImgBlobUrl] = useState<string[]>();

  useEffect(() => {
    if (!images) {
      setImgBlobUrl([]);
      return;
    }
    // console.log(images);
    const urls: string[] = Array.from(images).map((image) => {
      // console.log(image);
      return URL.createObjectURL(image);
    });
    setImgBlobUrl(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);
  return { imgBlobUrl };
}
