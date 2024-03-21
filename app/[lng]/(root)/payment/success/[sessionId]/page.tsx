import OrderSuccess from "@/components/order/OrderSuccess";

const SuccessPage = async ({ params }: { params: { sessionId: string } }) => {
  return (
    <div className="padding-container">
      <OrderSuccess params={params} />
    </div>
  );
};

export default SuccessPage;
