import { TProductSchema } from "@/lib/types";

export function parsePictureData(data: TProductSchema) {
  // Parse picture data into nice object array
  const pictureDataArr = data.pictures.reduce(
    (
      acc: { name: string; width: number; height: number }[],
      picture: { dimensions: { width: number; height: number }; picture: File }
    ) => {
      acc.push({
        name: picture.picture.name,
        width: picture.dimensions.width,
        height: picture.dimensions.height,
      });
      return acc;
    },
    []
  );
  return pictureDataArr;
}
