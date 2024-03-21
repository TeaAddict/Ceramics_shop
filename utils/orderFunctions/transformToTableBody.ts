import { TableOrder } from "@/components/admin/orders/OrdersTable";
import { capitalizeFirstLetter } from "../helper";

export function transformToTableBody(data: TableOrder[]) {
  return data.map((row) => {
    const res = {
      id: row.id,
      status: row.status,
      firstName: capitalizeFirstLetter(row.firstName),
      lastName: capitalizeFirstLetter(row.lastName),
      email: row.email,
      phone: row.phone,
      // created: row.createdAt.toUTCString(),
      city: row.city,
      state: row.state,
      country: row.country,
      postal_code: row.postal_code,
      line1: row.line1,
      line2: row.line2,
      created: row.createdAt,
    };
    return res;
  });
}
