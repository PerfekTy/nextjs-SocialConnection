import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
