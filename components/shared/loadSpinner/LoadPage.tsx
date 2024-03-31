import React from "react";
import LoadSpinner from "./LoadSpinner";

const LoadPage = ({ minHeight = false }: { minHeight?: boolean }) => {
  return (
    <div
      className={`flex flex-1 ${
        minHeight ? "min-h-[50vh]" : "h-full"
      } w-full justify-center items-center`}
    >
      <LoadSpinner />
    </div>
  );
};

export default LoadPage;
