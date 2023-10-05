import { FaTwitter } from "react-icons/fa";

export default function TwitterHeader() {
  return (
    <header className="flex justify-center items-center font-medium lg:text-[1rem] xl:text-[2rem] text-[1.3rem] gap-10 py-2 bg-[#1da2f4] text-muted dark:text-white dark:bg-opacity-75">
      <h1 className="fade-ani">Welcome to Twitter!</h1>
      <FaTwitter size={60} className="fade-ani " />
    </header>
  );
}
