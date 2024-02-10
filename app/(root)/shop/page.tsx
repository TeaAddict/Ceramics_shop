import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { useItems } from "@/hooks/useItems";
import { getCategories } from "@/app/api/_functions/getCategories";

const ShopPage = async ({
  color = "default",
}: {
  color?: "default" | "inverted";
}) => {
  const categories = await getCategories();

  return (
    <section className="padding-container">
      <ShopWindow color={color} />
      <div className="sm:hidden">
        <MobileFooter categories={categories} />
      </div>
    </section>
  );
};

export default ShopPage;
