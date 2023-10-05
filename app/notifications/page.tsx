import { Header } from "@/components/home/header";
import NotificationsFeed from "@/components/notifications/notifications-feed";

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications