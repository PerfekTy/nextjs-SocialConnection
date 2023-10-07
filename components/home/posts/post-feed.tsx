"use client";

import { PostItem } from "./post-item";

import { usePosts } from "@/hooks/usePosts";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  if (posts.length === 0) {
    return (
      <div className="flex justify-center text-2xl">
        No posts. Write something.
      </div>
    );
  }

  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} userId={userId as string} />
      ))}
    </>
  );
};
