import ItemWindow from "@/components/shop/ItemWindow";
import { getServerSession } from "next-auth";
import React from "react";

const ItemPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  return (
    <div className="padding-container">
      <ItemWindow params={params} session={session} />
    </div>
  );
};

export default ItemPage;
