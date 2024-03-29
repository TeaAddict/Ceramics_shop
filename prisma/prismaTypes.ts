import { Prisma } from "@prisma/client";

const itemWithPicThumb = Prisma.validator<Prisma.ItemDefaultArgs>()({
  include: { thumbnail: true, pictures: true },
});
export type ItemWithPicThumb = Prisma.ItemGetPayload<typeof itemWithPicThumb>;

const item = Prisma.validator<Prisma.ItemDefaultArgs>()({});
export type ItemSimple = Prisma.ItemGetPayload<typeof item>;

const transactionFull = Prisma.validator<Prisma.TransactionDefaultArgs>()({
  include: {
    soldItems: { include: { item: { include: { thumbnail: true } } } },
    customerDetails: { include: { address: true } },
    order: true,
  },
});
export type TransactionFull = Prisma.TransactionGetPayload<
  typeof transactionFull
>;

const ordersType = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    transaction: {
      include: {
        customerDetails: { include: { address: true } },
        soldItems: { include: { item: { include: { thumbnail: true } } } },
      },
    },
  },
});
export type OrdersType = Prisma.OrderGetPayload<typeof ordersType>;

const soldItemType = Prisma.validator<Prisma.SoldItemDefaultArgs>()({
  include: { item: { include: { thumbnail: true } } },
});
export type SoldItemType = Prisma.SoldItemGetPayload<typeof soldItemType>;
