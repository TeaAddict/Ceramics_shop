import { NextResponse } from "next/server";

export async function deleteItem(id: string) {
  try {
    await fetch(`/api/admin/item/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Problem deleting item: ${error}`);
    throw new Error(`Problem deleting item: ${error}`);
  }
}

export async function addItem(data: FormData) {
  try {
    const response = await fetch(`/api/admin/item`, {
      method: "POST",
      body: data,
    });
    if (!response.ok) {
      return NextResponse.json({ success: false });
    }
    return response.json();
  } catch (error) {
    console.error(`Problem adding item: ${error}`);
    throw new Error(`Problem adding item: ${error}`);
  }
}

export async function updateItem(data: { data: FormData; id: string }) {
  try {
    const response = await fetch(`/api/admin/item/${data.id}`, {
      method: "PUT",
      body: data.data,
    });
    return response.json();
  } catch (error) {
    console.error(`Problem updating item: ${error}`);
    throw new Error(`Problem updating item: ${error}`);
  }
}
