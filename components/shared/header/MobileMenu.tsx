"use client";

import React, { useState } from "react";
import Hamburger from "./Hamburger";
import MobileNavbar from "./MobileNavbar";
import { Session } from "next-auth";

const MobileMenu = ({ session }: { session: Session | null }) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
    <div>
      <Hamburger
        isActive={isMobileMenuActive}
        setIsActive={setIsMobileMenuActive}
      />
      <MobileNavbar
        isMobileMenuActive={isMobileMenuActive}
        setIsMobileMenuActive={setIsMobileMenuActive}
        session={session}
      />
    </div>
  );
};

export default MobileMenu;
