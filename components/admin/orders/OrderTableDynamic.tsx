"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OrderStatusBadge from "./OrderStatusBadge";
import { sortTableBody } from "@/utils/orderFunctions/sortTableBody";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { addAscOrDesc } from "./addAscOrDesc";

/**
 * Represents an order table with dynamic sorting functionality.
 * @param {object} props - The props object.
 * @param {string[]} props.head - The headers of the table.
 * @param {object[]} props.body - The body of the table.
 * @param {Function} [props.onClickHead] - Function to handle click events on table headers.
 * @param {Function} [props.onClickBody] - Function to handle click events on table body cells.
 * @param {string} [props.initSort] - Initial sorting configuration. Should be in the format "data-asc".
 */

type Props = {
  head: { label: string; value: string }[];
  body: { [key: string]: any }[];
  onClickHead?: Function;
  onClickBody?: Function;
  initSort?: [{ name: string; value: string }];
};

const OrderTableDynamic = ({
  head,
  body,
  onClickHead,
  onClickBody,
  initSort,
}: Props) => {
  const { lastParams, setLastParams } = useUpdateSearchParams(
    initSort ?? [{ name: "orderSortBy", value: head[0].value.concat("-desc") }]
  );
  let lastParams2 = lastParams?.[0].value ?? head[0].value.concat("-desc");
  const sorted = sortTableBody(body, lastParams2);

  function handleSort(val: string) {
    onClickHead?.(val);
    const sortBy = addAscOrDesc(val, lastParams2);
    setLastParams([{ name: "orderSortBy", value: sortBy }]);
  }
  function handleClick(row: any) {
    onClickBody?.(row);
  }

  return (
    <ScrollArea className="pb-5" type="always">
      <table className="text-left w-full text-sm">
        <thead className="uppercase">
          <tr className="border-b-4">
            {head.map((el) => (
              <th
                className="px-6 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSort(el.value)}
                key={el.value}
              >
                {el.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(row)}
            >
              {head.map((el) => (
                <td className="px-6 py-4" key={el.value}>
                  {typeof row[el.value] === "object" ? (
                    (row[el.value] as Date).toUTCString()
                  ) : el.value !== "status" ? (
                    row[el.value]
                  ) : (
                    <OrderStatusBadge status={row[el.value]} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ScrollBar orientation="horizontal" className="h-4" />
    </ScrollArea>
  );
};

export default OrderTableDynamic;
