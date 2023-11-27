import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { AuthModal } from "@/components/modals/auth-modal";

export default function HeaderHome() {
  return (
    <header className="font-medium lg:text-[1rem] xl:text-[1.5rem] text-[1rem] py-2 bg-[#2dac5c] text-muted dark:text-white dark:bg-opacity-75 rounded-lg m-2">
      <div className="flex justify-center items-center gap-4 fade-ani">
        <h1>Welcome to Social Connection!</h1>
        <MdOutlineConnectWithoutContact size={60} />
      </div>
      <div className="flex justify-center m-2">
        <AuthModal />
      </div>
    </header>
  );
}
