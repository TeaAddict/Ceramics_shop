import prisma from "@/lib/prisma";
export async function getPicKeys(id: string) {
  const imgKeysKeys = await prisma.picture.findMany({
    where: { itemId: id },
    select: { key: true },
  });
  const imgKeys = imgKeysKeys.map((key) => {
    if (key.key) return key.key;
  });
  const existingKeys = imgKeys.filter((val) => val !== undefined);
  return existingKeys;
}
