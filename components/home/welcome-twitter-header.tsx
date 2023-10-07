import { MdOutlineConnectWithoutContact } from "react-icons/md";

export default function TwitterHeader() {
  return (
    <header className="flex justify-center items-center font-medium lg:text-[1rem] xl:text-[2rem] text-[1rem] gap-4 py-2 bg-[#2dac5c] text-muted dark:text-white dark:bg-opacity-75 rounded-xl">
      <h1 className="fade-ani">Welcome to SocialConnection!</h1>
      <MdOutlineConnectWithoutContact size={60} className="fade-ani " />
    </header>
  );
}
