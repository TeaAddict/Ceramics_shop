import ClientCart from "@/components/cart/ClientCart";
import { getContacts } from "@/utils/server/settings/getContacts";

const CartPage = async () => {
  const contacts = await getContacts();
  if (contacts)
    return (
      <>
        <ClientCart contacts={contacts} />
      </>
    );
};

export default CartPage;
