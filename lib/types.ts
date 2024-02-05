import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  price: z.coerce.number().min(1, "Price is required"),
  stock: z.coerce.number().min(1, "minimum 1 in stock"),
  category: z.string().min(1, "Category is required").max(255),
  description: z.string(),
  thumbnailPicture: z.string().min(1, "Thumbnail is required, select image"),
  pictures: z
    .any()
    .refine((files) => Array.from(files).length > 0, "Image is required.")
    .refine(
      (files: FileList) =>
        Array.from(files).some((file) => file.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine((files: FileList) => {
      const result = Array.from(files).some((file: File) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
      return result;
    }, ".jpg, .jpeg, .png and .webp files are accepted."),
});

export const pictureSchemaServer = z.object({
  dimensions: z.object({
    width: z.number().min(1),
    height: z.number().min(1),
  }),
  picture: z.instanceof(File),
});

export const productSchemaServer = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(1),
  category: z.string().min(1),
  description: z.string(),
  thumbnailPicture: z.string().min(1),
  pictures: z.array(pictureSchemaServer).min(1),
});

export type pictureSchema = {
  id: string;
  itemId: string;
  name: string;
  width: number;
  height: number;
};

export type ProductSchema = {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  thumbnail: pictureSchema;
  thumbnailId: string;
  pictures: pictureSchema[];
};

export type ParsedItem = {
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  thumbnailPicture: string;
  pictures: [{ dimensions: { width: number; height: number }; picture: File }];
};

type TThumbnail = {
  width: number;
  height: number;
  name: string;
};

type TPictures = {
  width: number;
  height: number;
  name: string;
};

export type TItemInDb = {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  thumbnail: TThumbnail;
  thumbnailId: string;
  pictures: TPictures[];
};

export type TItemSchema = z.infer<typeof itemSchema>;
export type TProductSchemaServer = z.infer<typeof productSchemaServer>;
