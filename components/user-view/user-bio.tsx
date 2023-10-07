"use client";
import { useMemo } from "react";

import { useUser } from "@/hooks/useUser";
import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

import { Button } from "@/components/ui/button";
import { BiCalendar } from "react-icons/bi";
import { EditModal } from "../modals/edit-modal";
import { useFollow } from "@/hooks/useFollow";

export const UserBio = ({ userId }: { userId: string }) => {
  const { data: currentUser } = useCurrentUserSession();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow, isLoading } = useFollow(userId as string);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return new Date(fetchedUser.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.user?.email === fetchedUser.email ? (
          <EditModal userId={userId} />
        ) : (
          <Button
            variant={isFollowing ? "destructive" : "default"}
            className="rounded-lg w-20"
            onClick={toggleFollow}
            disabled={isLoading}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-sm">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4 italic">{fetchedUser?.bio}</div>
        <div className="flex flex-row items-center gap-2 mt-4 text-muted-foreground text-sm">
          <BiCalendar size={20} />
          <p>Joined {createdAt}</p>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1 text-muted-foreground text-sm">
            <p>{fetchedUser?.followingIds?.length} Following</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1 text-muted-foreground text-sm">
            <p>{fetchedUser?.followersCount || 0} Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
