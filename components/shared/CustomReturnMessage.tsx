import React, { ReactNode } from "react";
import BackButton from "./BackButton";

const CustomReturnMessage = ({
  children,
  text,
  backButton = true,
}: {
  children?: ReactNode;
  text: string;
  backButton?: boolean;
}) => {
  return (
    <div className="padding-container flex flex-1 flex-col mx-auto justify-center items-center gap-10 2xl:max-w-[50vw]">
      <p className="text-2xl font-semibold">{text}</p>
      <div className="flex  gap-10">
        {backButton && <BackButton />}
        {children}
      </div>
    </div>
  );
};

export default CustomReturnMessage;
