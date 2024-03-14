"use client";
import React, { useState } from "react";
import { SoldItemType } from "@/prisma/prismaTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { capitalizeFirstLetter } from "@/utils/helper";
import OrderModalWindow from "./OrderModalWindow";
import OrderTableDynamic from "./OrderTableDynamic";
import { ORDER_TABLE_HEAD } from "@/constants";
import { transformToTableBody } from "@/utils/orderFunctions/transformToTableBody";
import { DeliveryStatus } from "@prisma/client";

export type TableOrder = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: DeliveryStatus;
  createdAt: Date;
  expiresAt: Date;
  soldItems: SoldItemType[];
  amountTotal: number;
};

const OrdersTable = ({ data }: { data: TableOrder[] }) => {
  const tableBody = transformToTableBody(data);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(data[0]);

  function handleClick(row: TableOrder) {
    setOpen(true);
    const rowData = data.find((item) => item.id === row.id)!;
    setRowData(rowData);
  }

  function handleSort(val: string) {}

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <OrderTableDynamic
          head={ORDER_TABLE_HEAD}
          body={tableBody}
          onClickBody={handleClick}
          onClickHead={handleSort}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {capitalizeFirstLetter(rowData.firstName)}{" "}
              {capitalizeFirstLetter(rowData.lastName)}
            </DialogTitle>
          </DialogHeader>
          <OrderModalWindow row={rowData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
