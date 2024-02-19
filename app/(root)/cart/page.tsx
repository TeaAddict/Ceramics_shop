import ClientCart from "@/components/cart/ClientCart";
import { getServerSession } from "next-auth";

const CartPage = async () => {
  const session = await getServerSession();
  return (
    <>
      <ClientCart session={session} />
    </>
  );
};

export default CartPage;
