import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";

import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";

import { useLike } from "@/hooks/useLike";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

export const PostItem = ({ userId, data = {} }: PostItemProps) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isLiked, toggleLike, isLoading } = useLike({
    postId: data.id,
    userId,
  });

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${data.user?.id}`);
    },
    [data.user?.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!currentUser) {
        return toast.error("Sign in to like!");
      }

      toggleLike();
    },
    [currentUser, toggleLike]
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
    <div
      onClick={goToPost}
      className="border-b-[1px] p-5 cursor-pointer transition dark:hover:bg-[#05153d] hover:bg-[#f3f3f3]"
    >
      <div className="flex flex-row items-center gap-3">
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
          <div className="flex flex-row items-center mt-3 gap-10 relative">
            <div className="flex flex-row items-center gap-2 cursor-pointer transition hover:text-[#2dac5c] text-muted-foreground">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <button
              className="flex flex-row items-center gap-2 cursor-pointer transition hover:text-red-500 text-muted-foreground"
              onClick={onLike}
              disabled={isLoading}
            >
              {isLiked ? (
                <AiFillHeart size={20} color="red" />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <p>{data.likedIds?.length || 0}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
