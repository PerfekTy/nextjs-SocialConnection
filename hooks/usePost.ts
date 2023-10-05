import useSWR from "swr";

import fetcher from "@/lib/fetcher";

export const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
