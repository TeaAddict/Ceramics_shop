import { Prisma } from "@prisma/client";

const itemWithPicThumbFav = Prisma.validator<Prisma.ItemDefaultArgs>()({
  include: { thumbnail: true, favouritedByUsers: true, pictures: true },
});

export type ItemWithPicThumbFav = Prisma.ItemGetPayload<
  typeof itemWithPicThumbFav
>;

const transactionFull = Prisma.validator<Prisma.TransactionDefaultArgs>()({
  include: {
    soldItems: true,
    customerDetails: { include: { address: true } },
  },
});

export type TransactionFull = Prisma.TransactionGetPayload<
  typeof transactionFull
>;
