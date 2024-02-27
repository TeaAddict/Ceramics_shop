import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { getCategories } from "@/app/api/_functions/getCategories";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getServerSession } from "next-auth";

const ShopPage = async ({
  color = "default",
  searchParams,
}: {
  color?: "default" | "inverted";
  searchParams: { category: string; sortBy: string; tab: string; page: string };
}) => {
  const categories = await getCategories();
  const isAdmin = await isAdminRole();

  return (
    <section className="padding-container">
      <h1>Shop</h1>
      <ShopWindow color={color} searchParams={searchParams} isAdmin={isAdmin} />
      <div className="sm:hidden">
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default ShopPage;
