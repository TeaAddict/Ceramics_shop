import prisma from "@/lib/prisma";

export async function getUniqueCategories() {
  try {
    const categories = await prisma.item.findMany({
      distinct: "category",
      select: { category: true },
    });
    const data = categories.map((el) => el.category);
    return data;
  } catch (error) {
    console.log(`Problem getting unique categories: ${error}`);
    throw new Error(`Problem getting unique categories: ${error}`);
  }
}
export async function getCategories() {
  try {
    const categories = await prisma.item.findMany({
      select: { category: true },
      where: { stock: { gt: 0 } },
    });
    return categories;
  } catch (error) {
    console.log(`Problem getting categories: ${error}`);
    throw new Error(`Problem getting categories: ${error}`);
  }
}
