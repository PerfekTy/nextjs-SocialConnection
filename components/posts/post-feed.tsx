"use client";

import { PostItem } from "./post-item";

import { usePosts } from "@/hooks/usePosts";
import { HashLoader } from "react-spinners";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-1/4">
          <HashLoader color="lightblue" />
        </div>
      ) : (
        posts.map((post: Record<string, any>) => (
          <PostItem key={post.id} data={post} userId={userId as string} />
        ))
      )}
    </>
  );
};
