import { FollowBar } from "./follow-bar/follow-bar";
import NavLayout from "./nav/nav-layout";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="md:container h-full mx-auto xl:px-30 max-w-6xl px-0 transition">
        <NavLayout />
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-3 lg:col-span-2 border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};
