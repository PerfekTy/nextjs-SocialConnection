"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";

import { BsBell } from "react-icons/bs";
import { PiEnvelopeLight } from "react-icons/pi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { PostButton } from "./post-button";

import { NavItem } from "./nav-item";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NavDropdownMenu } from "./dropdown-menu";
import { AuthModal } from "../modals/auth-modal";
import { signOut } from "next-auth/react";

interface mainNavProps {
  mobileMenu: boolean;
  setMobileMenu: (boolean: boolean) => void;
}

export default function NavMain({ mobileMenu, setMobileMenu }: mainNavProps) {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const pathname = usePathname();
  const ref = useRef<HTMLMenuElement>(null);

  console.log(currentUser?.hasNotification);

  useClickOutside(ref, mobileMenu, setMobileMenu);

  const goToUser = useCallback(() => {
    if (!currentUser) {
      return null;
    }

    setMobileMenu(false);
    router.push(`/users/${currentUser.id}`);
  }, [router, currentUser, setMobileMenu]);

  const ROUTES = [
    {
      label: "Home",
      href: "/",
      icon: <MdOutlineConnectWithoutContact size={30} />,
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
    {
      label: "",
      href: "/",
      icon: <PostButton />,
    },
  ];

  return (
    <nav
      className={
        mobileMenu
          ? "flex md:flex md:flex-row md:static md:items-center md:p-0 md:gap-6 lg:gap-10 flex-col gap-14 bg-[#f3f3f3] absolute left-0 top-0 dark:bg-[#081d0f] h-full p-10 z-50"
          : "hidden md:flex md:flex-row md:static md:items-center md:p-0 md:gap-6 lg:gap-10 flex-col gap-14 absolute left-0 top-0 h-full p-10 z-50"
      }
      ref={ref}
    >
      <div className="md:hidden flex items-center gap-4 fade-ani">
        <MdOutlineConnectWithoutContact size={40} color="#2dac5c" />
        <h2 className="text-lg font-semibold tracking-wider">
          Social Connection
        </h2>
      </div>
      {ROUTES.map((route) => (
        <NavItem
          key={route.label}
          href={route.href}
          label={route.label}
          active={route.active}
          icon={route.icon}
          alert={route.alert}
          onClick={() => setMobileMenu(false)}
        />
      ))}

      <div className="md:flex md:justify-center md:items-center hidden  ">
        <NavDropdownMenu pathname={pathname} currentUser={currentUser} />
      </div>

      {currentUser && (
        <div className="md:hidden flex flex-col gap-6 justify-center items-center">
          <Image
            src={currentUser?.profileImage || "/images/placeholder.png"}
            alt="Profile image"
            width={40}
            height={40}
            className={
              pathname === `/users/${currentUser.id}`
                ? "rounded-full object-cover h-10 border-2 border-[#2dac5c] cursor-pointer"
                : "rounded-full object-cover h-10 outline cursor-pointer"
            }
            onClick={() => goToUser()}
          />
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
        <>
          <Button
            variant="link"
            className="flex justify-center hover:scale-110 transition-transform duration-150 fade-ani"
            onClick={() => setMobileMenu(false)}
          >
            <IoIosCloseCircleOutline size={30} color="#2dac5c" />
          </Button>
        </>
      )}
    </nav>
  );
}
