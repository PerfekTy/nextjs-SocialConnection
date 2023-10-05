"use client";

import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "./avatar/avatar";
import { ArrowDownWideNarrow } from "lucide-react";

export const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="border rounded-xl p-4">
        <h2 className="dark:text-white text-xl font-semibold flex gap-2 items-center justify-start">
          People you might know <ArrowDownWideNarrow />
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 items-center">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
