"use client";

import toast from "react-hot-toast";
import axios from "axios";

import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { useUser } from "./useUser";

export const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId as string);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return toast.error("Sign in to follow!");
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("User followed / unfollowed");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, mutateFetchedUser, mutateCurrentUser]);

  return { isFollowing, toggleFollow };
};
