import React from "react";
import LoadSpinner from "./LoadSpinner";

const LoadPage = () => {
  return (
    <div className="flex flex-1 h-full w-full justify-center items-center">
      <LoadSpinner />
    </div>
  );
};

export default LoadPage;
