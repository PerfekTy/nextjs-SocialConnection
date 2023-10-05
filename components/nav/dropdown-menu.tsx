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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { AiOutlineUser } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

export const NavDropdownMenu = ({
  currentUser,
  pathname,
}: {
  currentUser: any;
  pathname: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {currentUser ? (
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
        ) : (
          <Button variant="ghost">
            <AiOutlineUser size={30} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center p-0">
        <DropdownMenuLabel className="fade-ani mt-1">
          {currentUser ? currentUser.user?.name : <FaTwitter size={25} />}
        </DropdownMenuLabel>
        {currentUser && (
          <DropdownMenuItem>
            <Link href={`/users/${currentUser?.id}`}>My Profile</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {currentUser ? (
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="mb-3"
          >
            {"Logout"}
          </Button>
        ) : (
          <div className="mb-5">
            <AuthModal />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
