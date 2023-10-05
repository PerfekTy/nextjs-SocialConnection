import { useSession } from "next-auth/react";

export const useCurrentUserSession = () => {
  const { data, status } = useSession();

  return { data, status };
};
