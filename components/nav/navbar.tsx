"use client";

import { useState } from "react";

import { ModeToggle } from "@/components/ui/theme-switcher";
import MainNav from "@/components/nav/main-nav";
import Hamburger from "@/components/ui/hamburger";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="border-b flex justify-center">
      <div className="flex h-16 items-center px-4">
        <MainNav mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        <Hamburger setMobileMenu={setMobileMenu} />
        <div className="flex items-center md:static md:ml-10 md:gap-7 gap-5 absolute right-5">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
