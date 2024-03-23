import { ProductSchema } from "@/lib/types";

export async function getPictures(item?: ProductSchema) {
  try {
    if (!item) return;
    const pictures = item.pictures.map((pic) => `${pic.name}`);
    const response = await Promise.all(
      pictures.map(async (pic) => {
        const response = await fetch(`/uploads/${pic}`);
        const blob = await response.blob();
        const file = new File([blob], pic, { type: blob.type });
        return file;
      })
    );
    return response;
  } catch (error) {
    console.error(`Problem getting pictures: ${error}`);
    throw new Error(`Problem getting pictures: ${error}`);
  }
}
