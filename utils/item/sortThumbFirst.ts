import { Pictures } from "@/components/shop/photo/ImageShowcase";

export function sortThumbFirst(
  imageNames: Pictures[],
  thumbName: string
): Pictures[] {
  const sortedImages = imageNames.sort((imgA, imgB) => {
    const lowerCaseThumb = thumbName.toLowerCase();
    if (imgA.name === lowerCaseThumb) return -1;
    return 1;
  });
  return sortedImages;
}
