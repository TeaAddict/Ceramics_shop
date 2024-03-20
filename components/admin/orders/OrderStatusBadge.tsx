"use client";
import { useTranslation } from "@/app/i18n/client";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { DeliveryStatus } from "@prisma/client";

const OrderStatusBadge = ({ status }: { status: DeliveryStatus }) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "admin");
  const variants = {
    SHIPPING: {
      label: t("shipping"),
      text: "text-white",
      background: "bg-orange-500",
    },
    SHIPPED: {
      label: t("shipped"),
      text: "text-white",
      background: "bg-yellow-400",
    },
    ARRIVED: {
      label: t("arrived"),
      text: "text-white",
      background: "bg-blue-400",
    },
    COLLECTED: {
      label: t("collected"),
      text: "text-white",
      background: "bg-green-500",
    },
  };

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
