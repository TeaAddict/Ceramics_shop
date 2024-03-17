import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";

const FacebookButton = ({ size = 40 }: { size?: number }) => {
  return (
    <Link href={"https://www.facebook.com/"} className="hover:text-primary">
      <FaFacebook size={size} />
    </Link>
  );
};

export default FacebookButton;
