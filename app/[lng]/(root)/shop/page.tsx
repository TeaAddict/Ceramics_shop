import ShopWindow from "@/components/shop/ShopWindow";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import LoadPage from "@/components/shared/loadSpinner/LoadPage";
import { useTranslation } from "@/app/i18n";

const ShopPage = async ({
  searchParams,
  params: { lng },
}: {
  color?: "default" | "inverted";
  searchParams: { category: string; sortBy: string; tab: string; page: string };
  params: { lng: string };
}) => {
  const settings = await getGeneralSettings();
  const isAdmin = await isAdminRole();
  const { t } = await useTranslation(lng, "shop");

  if (!settings) return <LoadPage />;
  return (
    <section className="padding-container flex-col">
      <h1>{t("title")}</h1>
      <ShopWindow
        color="default"
        searchParams={searchParams}
        isAdmin={isAdmin}
        settings={settings}
        lng={lng}
      />
    </section>
  );
};

export default ShopPage;
