import { Button } from "./button";

interface hamburgerProps {
  setMobileMenu: (boolean: boolean) => void;
}

export default function Hamburger({ setMobileMenu }: hamburgerProps) {
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        setMobileMenu(true);
      }}
      className="flex md:hidden items-center flex-col absolute left-5"
    >
      <div className="bg-black dark:bg-muted-foreground w-7 h-[2px] m-[3px]"></div>
      <div className="bg-black dark:bg-muted-foreground w-7 h-[2px] m-[3px]"></div>
      <div className="bg-black dark:bg-muted-foreground w-7 h-[2px] m-[3px]"></div>
    </Button>
  );
}
