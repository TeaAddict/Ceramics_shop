import ShopWindow from "../shop/ShopWindow";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { useTranslation } from "@/app/i18n";

const Shopboard = async ({
  searchParams,
  lng,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
  lng: string;
}) => {
  const { t } = await useTranslation(lng, "shop");
  const settings = await getGeneralSettings();

  if (!settings)
    return (
      <CustomReturnMessage text={t("missingSettings")} backButton={false} />
    );

  return (
    <div className="flex-col">
      <ShopWindow
        searchParams={searchParams}
        color="inverted"
        isAdmin={true}
        settings={settings}
        lng={lng}
      />
    </div>
  );
};

export default Shopboard;
