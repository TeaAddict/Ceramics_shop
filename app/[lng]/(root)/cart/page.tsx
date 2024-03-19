import ClientCart from "@/components/cart/ClientCart";

const CartPage = async ({ params: { lng } }: { params: { lng: string } }) => {
  return (
    <>
      <ClientCart lng={lng} />
    </>
  );
};

export default CartPage;
