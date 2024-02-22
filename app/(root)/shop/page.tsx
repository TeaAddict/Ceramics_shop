import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { getCategories } from "@/app/api/_functions/getCategories";
import { isAdminRole } from "@/utils/server/isAdminRole";
import LoadSpinner from "@/components/shared/loadSpinner/LoadSpinner";

const ShopPage = async ({
  color = "default",
  searchParams,
}: {
  color?: "default" | "inverted";
  searchParams: { category: string; sortBy: string };
}) => {
  const categories = await getCategories();
  const isAdmin = await isAdminRole();

  return (
    <section className="padding-container">
      <ShopWindow color={color} searchParams={searchParams} isAdmin={isAdmin} />
      <div className="sm:hidden">
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default ShopPage;
