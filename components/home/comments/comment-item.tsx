import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";

export const CommentItem = ({ data = {} }: { data: Record<string, any> }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return new Date(data?.createdAt).toLocaleDateString("en-EN", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data?.createdAt]);

  return (
    <div className="border-b-[1px] p-5 cursor-pointer transition dark:hover:bg-[#05153d] hover:bg-[#f3f3f3]">
      <div className="flex flex-row items-center justify-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span
              className="text-muted-foreground cursor-pointer hover:underline hidden md:block text-sm"
              onClick={goToUser}
            >
              @{data.user.username}
            </span>
            <span className="text-sm">{createdAt}</span>
          </div>
          <div className="mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};
