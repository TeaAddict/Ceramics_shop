import { TItemSchema } from "@/lib/types";
import { getImagesWithDimensions } from "@/utils/helper";

export async function createPicObj(formData: TItemSchema) {
  // initial pictures are string[] because pic url in db
  // if pictures changed pic data going to be File[] or FileList

  let pictureArray: {
    picture: File | string;
    dimensions: { width: number; height: number };
  }[];
  if (typeof formData.pictures[0] !== "string") {
    pictureArray = await getImagesWithDimensions(formData.pictures);
  } else {
    pictureArray = [
      {
        picture: JSON.stringify("placeholder"),
        dimensions: { width: 0, height: 0 },
      },
    ];
  }
  return pictureArray;
}
