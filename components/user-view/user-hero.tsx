"use client";

import { useUser } from "@/hooks/useUser";

import Image from "next/image";

import { Avatar } from "../avatar/avatar";

export const UserHero = ({ userId }: { userId: string }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="h-44 relative bg-[#f3f3f3] dark:bg-[#05153d]">
        {fetchedUser?.coverImage && (
          <Image
            fill
            src={fetchedUser?.coverImage}
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};
