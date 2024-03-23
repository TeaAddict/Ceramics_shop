import prisma from "@/lib/prisma";
import { SoldItem } from "@/utils/types/stripe";

export async function decrementItemStock(soldItems: SoldItem[]) {
  try {
    await Promise.all(
      soldItems.map(async (item) => {
        const result = await prisma.item.update({
          where: { title: item.name },
          data: { stock: { decrement: item.quantity || 1 } },
        });

        if (result.stock < 0)
          console.error(`Stock cannot be negative for item: ${result.title}`);
      })
    );
  } catch (error) {
    console.log("Problem when decrementing item stock", error);
    throw new Error(`Problem when decrementing item stock: ${error}`);
  }
}
