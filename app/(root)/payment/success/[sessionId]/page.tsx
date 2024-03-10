import OrderClient from "@/components/order/OrderClient";
import React from "react";

const SuccessPage = ({ params }: { params: { sessionId: string } }) => {
  return (
    <div className="padding-container">
      <OrderClient params={params} />
    </div>
  );
};

export default SuccessPage;
