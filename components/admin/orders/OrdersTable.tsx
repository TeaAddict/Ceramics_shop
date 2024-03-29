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
import { translateOrderTableHead } from "@/utils/functions/translate/translateOrderTableHead";
import { useSearchParams } from "next/navigation";
import CheckBox from "@/components/shop/CheckBox";

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
  const searchParams = useSearchParams();

  const [hideStates, setHideStates] = useState({
    hideShipping: searchParams.get("hideShipping") === "true",
    hideShipped: searchParams.get("hideShipped") === "true",
    hideArrived: searchParams.get("hideArrived") === "true",
    hideCollected: searchParams.get("hideCollected") === "true",
  });

  const filteredBody = tableBody.filter((row) => {
    if (!hideStates.hideShipping && row.status === "SHIPPING") return row;
    if (!hideStates.hideShipped && row.status === "SHIPPED") return row;
    if (!hideStates.hideArrived && row.status === "ARRIVED") return row;
    if (!hideStates.hideCollected && row.status === "COLLECTED") return row;
  });

  function handleCheckboxChange(checkboxName: string) {
    setHideStates((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName as keyof typeof hideStates],
    }));
  }

  function handleClick(row: TableOrder) {
    setOpen(true);
    const rowData = data.find((item) => item.id === row.id)!;
    setRowData(rowData);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-10 mb-5">
        {Object.entries(hideStates).map(([checkboxName, isChecked]) => {
          const name = checkboxName.toLowerCase().replace("hide", "");
          return (
            <CheckBox
              key={checkboxName}
              label={`${t("hide")} "${t(name)}"`}
              paramName={checkboxName}
              initialState={isChecked}
              setState={() => handleCheckboxChange(checkboxName)}
            />
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <OrderTableDynamic
          head={transaltedHead}
          body={filteredBody}
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
