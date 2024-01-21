"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import QuantityPicker from "../shared/QuantityPicker2";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/store";

const data: Cart[] = [
  {
    id: "1",
    product: "asd",
    picture: "/assets/ceramics1.jpg",
    price: 123,
    quantity: 2,
    total: 0,
  },
  {
    id: "2",
    product: "qwe",
    picture: "/assets/ceramics2.png",
    price: 123,
    quantity: 2,
    total: 0,
  },
  {
    id: "3",
    product: "zxc",
    picture: "/assets/ceramics3.jpg",
    price: 123,
    quantity: 2,
    total: 0,
  },
];

export type Cart = {
  id: string;
  product: string;
  picture: string;
  price: number;
  quantity: number;
  total: number;
};

export const columns: ColumnDef<Cart>[] = [
  {
    accessorKey: "product",
    header: "PRODUCT",
    cell: ({ row }) => (
      <div className="capitalize font-[500]">{row.getValue("product")}</div>
    ),
  },
  {
    accessorKey: "picture",
    header: "",
    cell: ({ row }) => (
      <div className="w-32 h-32 relative">
        <Image
          alt=""
          src={row.getValue("picture")}
          fill
          className="object-cover w-auto h-auto"
          sizes="30vw"
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div>PRICE</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      return <div>{amount}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
    cell: ({ row }) => (
      // <div>{row.getValue("quantity")}</div>,
      <div>
        <QuantityPicker
          increase={() => handleIncrease(row.getValue("id"))}
          decrease={() => handleDecrease(row.getValue("id"))}
          currentValue={}
        />
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => <div>{row.getValue("total")}</div>,
  },
];

export function CartTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const cart = useAppSelector((state) => state.cartReducer.cartItems);

  function handleIncrease(id: string) {
    dispatch(increaseQuantity(id));
  }

  function handleDecrease(id: string) {
    dispatch(decreaseQuantity(id));
  }

  return (
    <div className="w-full">
      {/* <div className="rounded-md border"> */}
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
