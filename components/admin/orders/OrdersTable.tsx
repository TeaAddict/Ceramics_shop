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
import { transformToTableBody } from "@/utils/orderFunctions/transformToTableBody";
import { DeliveryStatus } from "@prisma/client";
import { useTranslation } from "@/app/i18n/client";
import { translateOrderTableHead } from "@/utils/functions/translateOrderTableHead";
import { TableHead } from "@/components/ui/table";

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
  city: string;
  state: string;
  country: string;
  postal_code: string;
  line1: string;
  line2: string;
};

const OrdersTable = ({ data, lng }: { data: TableOrder[]; lng: string }) => {
  const tableBody = transformToTableBody(data);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(data[0]);
  const { t } = useTranslation(lng, "admin");
  const transaltedHead = translateOrderTableHead(t);

  function handleClick(row: TableOrder) {
    setOpen(true);
    const rowData = data.find((item) => item.id === row.id)!;
    setRowData(rowData);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <OrderTableDynamic
          head={transaltedHead}
          body={tableBody}
          onClickBody={handleClick}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {capitalizeFirstLetter(rowData.firstName)}{" "}
              {capitalizeFirstLetter(rowData.lastName)}
            </DialogTitle>
          </DialogHeader>
          <OrderModalWindow row={rowData} lng={lng} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
