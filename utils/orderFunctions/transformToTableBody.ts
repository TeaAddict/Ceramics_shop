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
      created: row.createdAt,
    };
    return res;
  });
}
