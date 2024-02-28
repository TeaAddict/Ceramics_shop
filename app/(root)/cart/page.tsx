import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ClientCart from "@/components/cart/ClientCart";
import { getServerSession } from "next-auth";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <ClientCart session={session} />
    </>
  );
};

export default CartPage;
