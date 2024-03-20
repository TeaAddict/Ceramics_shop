import React from "react";
import { formatCentsToEuroCurrency } from "@/utils/helper";
import { useTranslation } from "@/app/i18n/client";

export type Product = {
  id: string;
  title: string;
  picture: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const ProductTable = ({ data, lng }: { data: Product[]; lng: string }) => {
  const { t } = useTranslation(lng, "shared");
  return (
    <table className="w-full flex flex-col gap-3">
      <thead>
        <tr className="grid grid-cols-[1fr_1fr_1fr_1fr] justify-start uppercase text-xs">
          <th className="justify-start flex">{t("name")}</th>
          <th className="justify-start flex">{t("unitPrice")}</th>
          <th className="justify-start flex">{t("quantity")}</th>
          <th className="justify-start flex">{t("total")}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center h-full border-t-2 text-xs xs:text-base"
            key={index}
          >
            <td className="h-full flex items-center capitalize">{row.title}</td>
            <td>{formatCentsToEuroCurrency(row.unitPrice)}</td>
            <td>{row.quantity}</td>
            <td>{formatCentsToEuroCurrency(row.totalPrice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
