import OrderClient from "@/components/order/OrderClient";
import React from "react";

const SuccessPage = ({ params }: { params: { session_id: string } }) => {
  return (
    <div className="padding-container">
      <OrderClient params={params} />
    </div>
  );
};

export default SuccessPage;
