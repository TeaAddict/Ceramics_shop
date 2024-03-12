import React from "react";
import { formatToEuroCurrency } from "@/utils/helper";
import Image from "next/image";
import { Button } from "../ui/button";

export type Product = {
  id: string;
  title: string;
  picture: string;
  stock: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const ProductTable = ({ data }: { data: Product[] }) => {
  return (
    <table className="w-full flex flex-col gap-3">
      <thead>
        <tr className="grid grid-cols-[1fr_1fr_1fr_1fr] justify-start uppercase text-xs">
          <th className="justify-start flex">name</th>
          {/* <th className="justify-start flex">PICTURE</th> */}
          <th className="justify-start flex">unit price</th>
          <th className="justify-start flex">quantity</th>
          <th className="justify-start flex">total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center h-full border-t-2 text-xs xs:text-base"
            key={index}
          >
            <td className="h-full flex items-center capitalize">{row.title}</td>
            {/* <td className="aspect-square max-w-32 my-2 relative">
              <Image
                alt=""
                src={`/uploads/${row.picture}`}
                className="object-cover"
                fill
                sizes="30vw"
              />
            </td> */}
            <td>{formatToEuroCurrency(row.unitPrice)}</td>
            <td>{row.quantity}</td>
            <td>{formatToEuroCurrency(row.totalPrice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
