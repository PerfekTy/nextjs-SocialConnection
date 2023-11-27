import { HeaderLabel } from "@/components/home/header-label";
import NotificationsFeed from "@/components/notifications/notifications-feed";

const Notifications = () => {
  return (
    <>
      <HeaderLabel label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;