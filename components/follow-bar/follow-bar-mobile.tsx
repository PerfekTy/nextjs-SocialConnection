"use client";

import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";

import { ArrowBigDown, ArrowDownWideNarrow } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const FollowBarMobile = () => {
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const [toggleFollowBar, setToggleFollowBar] = useState(false);

  const filteredUsers = users.filter(
    (user: Record<string, any>) => user?.id !== currentUser?.id,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setToggleFollowBar(!toggleFollowBar)}
        >
          <ArrowBigDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="my-2 mx-5">
        <DropdownMenuLabel className="flex gap-2">
          People you might know <ArrowDownWideNarrow />
        </DropdownMenuLabel>
        <div>
          <div className="px-4 pb-3">
            <h2 className="dark:text-white text-lg font-semibold flex gap-2 items-center justify-start"></h2>
            <div className="flex flex-col gap-6 mt-4">
              {filteredUsers.map((user: Record<string, any>) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FollowBarMobile;
