import useSWR from "swr";

import fetcher from "@/lib/fetcher";

export const useNotifications = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/notifications/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
