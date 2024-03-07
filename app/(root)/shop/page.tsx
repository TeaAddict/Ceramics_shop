import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { getCategories } from "@/app/api/_functions/getCategories";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import LoadPage from "@/components/shared/loadSpinner/LoadPage";

const ShopPage = async ({
  color = "default",
  searchParams,
}: {
  color?: "default" | "inverted";
  searchParams: { category: string; sortBy: string; tab: string; page: string };
}) => {
  const categories = await getCategories();
  const settings = await getGeneralSettings();
  const isAdmin = await isAdminRole();

  if (!settings) return <LoadPage />;
  return (
    <section className="padding-container flex-col">
      <h1>Shop</h1>
      <ShopWindow
        color={color}
        searchParams={searchParams}
        isAdmin={isAdmin}
        settings={settings}
      />
      <div className="sm:hidden">
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default ShopPage;
