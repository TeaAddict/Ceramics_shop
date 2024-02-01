import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { useItems } from "@/utils/useItems";

const ShopPage = ({
  color = "default",
}: {
  color?: "default" | "inverted";
}) => {
  return (
    <section className="padding-container">
      <ShopWindow color={color} />
      <div className="sm:hidden">
        <MobileFooter />
      </div>
    </section>
  );
};

export default ShopPage;
