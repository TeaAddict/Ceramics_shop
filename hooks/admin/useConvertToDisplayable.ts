import { useEffect, useState } from "react";

export function useConvertToDisplayable(images: FileList | undefined) {
  const [processedImages, setProcessedImages] = useState<string[]>();

  useEffect(() => {
    if (!images) {
      setProcessedImages([]);
      return;
    }
    const urls: string[] = Array.from(images).map((image) =>
      URL.createObjectURL(image)
    );
    setProcessedImages(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);
  return processedImages;
}
