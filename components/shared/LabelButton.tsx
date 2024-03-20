import React, { MouseEventHandler, ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

const LabelButton = ({
  children,
  isActive = false,
  onClick,
}: {
  children: ReactNode;
  isActive?: boolean;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between pt-3"
    >
      <div>{children}</div>
      {isActive && <FaCheck />}
    </button>
  );
};

export default LabelButton;
