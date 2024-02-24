import { NextResponse } from "next/server";

export async function deleteItem(id: string) {
  await fetch(`/api/admin/item/${id}`, { method: "DELETE" });
}

export async function addItem(data: FormData) {
  const response = await fetch(`/api/admin/item`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    // TODO change into nice toast
    alert("Submitting form failed!");
    return NextResponse.json({ success: false });
  }

  return response.json();
}

export async function updateItem(data: { data: FormData; id: string }) {
  const response = await fetch(`/api/admin/item/${data.id}`, {
    method: "PUT",
    body: data.data,
  });
  return response.json();
}
