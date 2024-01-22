import ShopWindow from "@/components/shop/ShopWindow";

const ShopPage = ({
  color = "default",
}: {
  color?: "default" | "inverted";
}) => {
  return (
    <section className="flex flex-col padding-container">
      <ShopWindow color={color} />
    </section>
  );
};

export default ShopPage;
