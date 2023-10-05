"use client";

import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import toast from "react-hot-toast";
import axios from "axios";
import { usePost } from "./usePost";
import { usePosts } from "./usePosts";

export const useLike = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedUser } = usePost(
    postId as string
  );
  const { mutate: mutateFetchedPosts } = usePosts(userId as string);

  const isLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (isLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();

      mutateFetchedPosts();
      mutateFetchedUser();

      toast.success("Post liked / unliked");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [isLiked, postId, mutateFetchedUser, mutateFetchedPosts]);

  return { isLiked, toggleLike };
};
