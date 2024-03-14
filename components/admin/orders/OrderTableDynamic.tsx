"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OrderStatusBadge from "./OrderStatusBadge";
import { convertToCamelCase } from "@/utils/helper";
import { sortTableBody } from "@/utils/orderFunctions/sortTableBody";
import { useUpdateSearchParams } from "@/utils/client/updateSearchParams";
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
  head: string[];
  body: { [key: string]: any }[];
  onClickHead?: Function;
  onClickBody?: Function;
  initSort?: string;
};

const OrderTableDynamic = ({
  head,
  body,
  onClickHead,
  onClickBody,
  initSort,
}: Props) => {
  const headCamelCase = convertToCamelCase(head);
  const { paramValue, setParamValue } = useUpdateSearchParams(
    initSort ?? head[0].concat("-desc")
  );
  const sorted = sortTableBody(body, paramValue);

  function handleSort(val: string) {
    onClickHead?.(val);

    const sortBy = addAscOrDesc(val, paramValue);
    setParamValue(sortBy);
  }
  function handleClick(row: any) {
    onClickBody?.(row);
  }

  return (
    <ScrollArea className="pb-5" type="always">
      <table className="text-left w-full text-sm">
        <thead className="uppercase">
          <tr className="border-b-4">
            {headCamelCase.map((el) => (
              <th
                className="px-6 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSort(el)}
                key={el}
              >
                {el}
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
              {headCamelCase.map((el) => (
                <td className="px-6 py-4" key={el}>
                  {typeof row[el] === "object" ? (
                    (row[el] as Date).toUTCString()
                  ) : el !== "status" ? (
                    row[el]
                  ) : (
                    <OrderStatusBadge status={row[el]} />
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
