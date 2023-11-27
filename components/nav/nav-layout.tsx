"use client";

import React, { useState } from "react";

import { ModeToggle } from "@/components/ui/theme-switcher";
import NavMain from "@/components/nav/nav-main";
import Hamburger from "@/components/ui/hamburger";
import FollowBarMobile from "@/components/follow-bar/follow-bar-mobile";

export default function NavLayout() {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  return (
    <div className="border-b flex justify-center">
      <div className="flex h-16 items-center px-4">
        <NavMain
          mobileMenu={toggleMobileMenu}
          setMobileMenu={setToggleMobileMenu}
        />
        <Hamburger setMobileMenu={setToggleMobileMenu} />
        <div className="flex items-center md:static md:ml-6 md:gap-7 gap-5 absolute right-5">
          <FollowBarMobile />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
