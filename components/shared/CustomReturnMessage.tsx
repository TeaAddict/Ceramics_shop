import React, { ReactNode } from "react";
import BackButton from "./BackButton";

const CustomReturnMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="padding-container flex flex-1 flex-col justify-center items-center gap-10">
      <p className="text-2xl font-semibold">{children}</p>
      <BackButton />
    </div>
  );
};

export default CustomReturnMessage;
