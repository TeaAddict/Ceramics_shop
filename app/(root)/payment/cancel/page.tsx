import CustomReturnMessage from "@/components/shared/CustomReturnMessage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return <CustomReturnMessage text="Payment canceled!" />;
};

export default CancelPage;
