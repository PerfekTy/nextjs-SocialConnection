"use client";

import { useRef } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { BsBell } from "react-icons/bs";
import { PiEnvelopeLight } from "react-icons/pi";
import { FaTwitter } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { TweetButton } from "./tweet-button";

import { NavItem } from "./nav-item";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NavDropdownMenu } from "./dropdown-menu";
import { AuthModal } from "../modals/auth-modal";

interface mainNavProps {
  mobileMenu: boolean;
  setMobileMenu: (boolean: boolean) => void;
}

export default function MainNav({ mobileMenu, setMobileMenu }: mainNavProps) {
  const { data: currentUser } = useCurrentUser();

  const pathname = usePathname();
  const ref = useRef<HTMLMenuElement>(null);

  useClickOutside(ref, mobileMenu, setMobileMenu);

  const routes = [
    {
      label: "Home",
      href: "/",
      icon: <FaTwitter size={30} />,
      active: pathname === "/",
    },
    {
      label: "Messages",
      href: "/messages",
      icon: <PiEnvelopeLight size={30} />,
      active: pathname === "/messages",
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: <BsBell size={30} />,
      active: pathname === "/notifications",
      alert: currentUser?.hasNotification,
    },
  ];

  return (
    <nav
      className={
        mobileMenu
          ? "flex md:flex md:flex-row md:static md:items-center md:p-0 md:gap-6 lg:gap-10 flex-col gap-14 bg-[#f3f3f3] absolute left-0 top-0 dark:bg-[#11182c] h-full p-10 z-50"
          : "hidden md:flex md:flex-row md:static md:items-center md:p-0 md:gap-6 lg:gap-10 flex-col gap-14 absolute left-0 top-0 h-full p-10 z-50"
      }
      ref={ref}
    >
      <div className="md:hidden flex items-center gap-4 fade-ani">
        <FaTwitter size={40} color="#1da2f4" />
        <h2 className="text-lg font-semibold tracking-wider">Twitter</h2>
      </div>
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          onClick={() => setMobileMenu(false)}
          label={route.label}
          active={route.active}
          icon={route.icon}
          alert={route.alert}
        />
      ))}

      <NavItem
        onClick={() => setMobileMenu(false)}
        href="/"
        icon={<TweetButton />}
      />

      <div className="md:flex md:justify-center md:items-center hidden  ">
        <NavDropdownMenu pathname={pathname} currentUser={currentUser} />
      </div>

      {currentUser && (
        <div className="md:hidden flex flex-col gap-6 justify-center items-center">
          <Button variant="ghost" className="p-0 rounded-full">
            <Image
              src={currentUser?.profileImage || "/images/placeholder.png"}
              alt="Profile image"
              width={40}
              height={40}
              className={
                pathname === `/users/${currentUser.id}`
                  ? "rounded-full object-cover h-10 border-2 border-[#1da2f4]"
                  : "rounded-full object-cover h-10 outline"
              }
            />
          </Button>
          <Button onClick={() => signOut()} variant="destructive">
            Logout
          </Button>
        </div>
      )}

      {!currentUser && (
        <div className="md:hidden flex flex-col -mt-5 justify-center items-center">
          <AuthModal />
        </div>
      )}

      {mobileMenu && (
        <Button
          variant={"ghost"}
          className="flex justify-center hover:scale-110 transition-transform duration-150 fade-ani"
          onClick={() => setMobileMenu(false)}
        >
          <IoIosCloseCircleOutline size={30} color="#1da2f4" />
        </Button>
      )}
    </nav>
  );
}
