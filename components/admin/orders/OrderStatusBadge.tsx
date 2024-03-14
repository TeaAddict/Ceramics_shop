import { DeliveryStatus } from "@prisma/client";

const variants = {
  SHIPPING: {
    label: "Shipping",
    text: "text-white",
    background: "bg-orange-500",
  },
  SHIPPED: {
    label: "Shipped",
    text: "text-white",
    background: "bg-yellow-400",
  },
  ARRIVED: {
    label: "Arrived",
    text: "text-white",
    background: "bg-blue-400",
  },
  COLLECTED: {
    label: "Collected",
    text: "text-white",
    background: "bg-green-500",
  },
};

const OrderStatusBadge = ({ status }: { status: DeliveryStatus }) => {
  const current = variants[status];
  return (
    <div
      className={`text-center p-1 rounded-md  ${current.text} ${current.background}`}
    >
      <p className="text-xs">{current.label}</p>
    </div>
  );
};

export default OrderStatusBadge;
