export async function deleteItem(id: string) {
  await fetch(`/api/admin/item/${id}`, { method: "DELETE" });
}
