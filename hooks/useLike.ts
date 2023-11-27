"use client";

import { useCallback, useMemo, useState } from "react";
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
    postId as string,
  );
  const { mutate: mutateFetchedPosts } = usePosts(userId as string);
  const [isLoading, setIsLoading] = useState(false);

  const isLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    try {
      setIsLoading(true);
      let request;

      if (isLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();

      await mutateFetchedPosts();
      await mutateFetchedUser();

      toast.success("Post liked / unliked");
    } catch (error) {
      toast.error("You can't like your own post!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, postId, mutateFetchedUser, mutateFetchedPosts]);

  return { isLiked, toggleLike, isLoading };
};
