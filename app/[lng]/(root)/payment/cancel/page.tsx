import { useTranslation } from "@/app/i18n";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";

const CancelPage = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng, "shop");
  return <CustomReturnMessage text={t("orderCanceled")} backButton={false} />;
};

export default CancelPage;
