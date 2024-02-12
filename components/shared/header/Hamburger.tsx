import React, { useState } from "react";

// const Hamburger = ({ isActive = false }: { isActive?: boolean }) => {
const Hamburger = ({
  isActive = false,
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // <div className="group inline-flex flex-col gap-1">
  //   <div className="group-hover:rotate-45 group-hover:translate-y-3 relative block bg-black w-10 h-2 transition-all duration-300" />
  //   <div className="group-hover:opacity-0 block bg-black w-10 h-2 transition-all duration-300" />
  //   <div className="group-hover:-rotate-45 group-hover:-translate-y-3 relative block bg-black w-10 h-2 transition-all duration-300" />
  // </div>
  return (
    <div
      className="inline-flex flex-col gap-1 relative z-10"
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <div
        className={
          isActive
            ? "rotate-45 translate-y-3 relative block bg-white w-10 h-2 transition-all duration-300"
            : "relative block bg-black w-10 h-2 transition-all duration-300"
        }
      />
      <div
        className={`${
          isActive && "opacity-0"
        } block bg-black w-10 h-2 transition-all duration-300`}
      />
      <div
        className={
          isActive
            ? "-rotate-45 -translate-y-3 relative block bg-white w-10 h-2 transition-all duration-300"
            : "relative block bg-black w-10 h-2 transition-all duration-300"
        }
      />
    </div>
  );
};

export default Hamburger;
