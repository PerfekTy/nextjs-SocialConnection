"use client";

import Image from "next/image";
import Link from "next/link";

import { AuthModal } from "../modals/auth-modal";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { AiOutlineUser } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";

export const NavDropdownMenu = ({
  currentUser,
  pathname,
}: {
  currentUser: any;
  pathname: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {currentUser ? (
          <Image
            src={currentUser?.profileImage || "/images/placeholder.png"}
            alt="Profile image"
            width={40}
            height={40}
            className={
              pathname === `/users/${currentUser.id}`
                ? "rounded-full object-cover h-10 border-2 border-[#2dac5c] cursor-pointer select-none"
                : "rounded-full object-cover h-10 outline cursor-pointer select-none"
            }
          />
        ) : (
          <Button variant="ghost">
            <AiOutlineUser size={30} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center fade-ani w-full">
        <DropdownMenuLabel className="text-[16px] tracking-wide px-0">
          {currentUser && (
            <>
              {currentUser?.username}
              <div className="my-3"></div>
              <Separator className="absolute left-0" />
            </>
          )}
        </DropdownMenuLabel>
        {currentUser && (
          <DropdownMenuItem>
            <Link className="px-2 py-1" href={`/users/${currentUser?.id}`}>
              My Profile
            </Link>
          </DropdownMenuItem>
        )}

        {currentUser ? (
          <DropdownMenuItem className="mb-1">
            <Button onClick={() => signOut()} variant="ghost" size="custom">
              Logout
            </Button>
          </DropdownMenuItem>
        ) : (
          <div className="mb-3">
            <AuthModal />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
