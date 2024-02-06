import { ProductSchema } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useImageFiles = (item?: ProductSchema) => {
  const pictureNames = item?.pictures.map((pic) => `${pic.name}`) ?? [];
  const { data, error, isLoading } = useQuery({
    queryKey: ["formPictures"],
    queryFn: async () => {
      const response = await Promise.all(
        pictureNames.map(async (pic) => {
          const response = await fetch(`/uploads/${pic}`);
          const blob = await response.blob();
          const file = new File([blob], pic, { type: blob.type });
          return file;
        })
      );
      return response;
    },
  });
  return { data, error, isLoading };
};
