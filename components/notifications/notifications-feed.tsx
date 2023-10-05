import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotifications } from "@/hooks/useNotifications";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-center p-6 text-xl text-muted-foreground">
        No notifications.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          className="flex flex-row items-center p-6 gap-4 border-b-[1px]"
          key={notification.id}
        >
          <BsTwitter size={23} />
          <p>{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
