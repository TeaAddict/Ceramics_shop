"use client";

import React, { useState } from "react";
import Hamburger from "./Hamburger";
import MobileNavbar from "./MobileNavbar";

const MobileMenu = () => {
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
      />
    </div>
  );
};

export default MobileMenu;
