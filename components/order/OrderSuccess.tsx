"use server";
import Link from "next/link";
import { GoCheckCircle } from "react-icons/go";
import { Button } from "../ui/button";
import Order from "./Order";
import { ModalWindow } from "../shared/ModalWindow";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { getSessionOrder } from "@/utils/server/order/getSessionOrder";
import { useTranslation } from "@/app/i18n";

const OrderSuccess = async ({
  params,
}: {
  params: { sessionId: string; lng: string };
}) => {
  const { data, error } = await getSessionOrder(params.sessionId);
  const { t } = await useTranslation(params.lng, "shop");

  if (error) {
    return <CustomReturnMessage text={error} />;
  } else {
    if (!data) return <LoadPage />;
  }
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-10">
      <div className="text-primary">
        <GoCheckCircle size={80} />
      </div>
      <div>
        <p className="text-3xl font-semibold">{t("orderSuccess.thankYou")}</p>
        <p className="text-md font-semibold">
          {t("orderSuccess.sendingEmail")}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <ModalWindow
          buttonLabel={t("orderSuccess.viewOrder")}
          variant={"secondary"}
          title={t("orderSuccess.orderDetails")}
        >
          <Order params={params} data={data} />
        </ModalWindow>
        <Link href={"/shop"}>
          <Button className="uppercase">
            {t("orderSuccess.continueShoping")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
