"use client";

import { ClipLoader } from "react-spinners";

import { HeaderLabel } from "@/components/home/header-label";

import { useUser } from "@/hooks/useUser";
import { UserHero } from "@/components/user-view/user-hero";
import { UserBio } from "@/components/user-view/user-bio";
import { PostFeed } from "@/components/posts/post-feed";

const UserView = ({ params }: { params: any }) => {
  const { userId } = params;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#2dac5c" size={80} />
      </div>
    );
  }

  return (
    <>
      <HeaderLabel label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
