import { Prisma } from "@prisma/client";

const itemWithPicThumbFav = Prisma.validator<Prisma.ItemDefaultArgs>()({
  include: { thumbnail: true, favouritedByUsers: true, pictures: true },
});

export type ItemWithPicThumbFav = Prisma.ItemGetPayload<
  typeof itemWithPicThumbFav
>;
