import OrderClient from "@/components/order/OrderClient";

const SuccessPage = async ({ params }: { params: { sessionId: string } }) => {
  return (
    <div className="padding-container">
      <OrderClient params={params} />
    </div>
  );
};

export default SuccessPage;
