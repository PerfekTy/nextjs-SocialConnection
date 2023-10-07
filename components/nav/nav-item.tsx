import Link from "next/link";
import { cn } from "@/lib/utils";

import { useCallback } from "react";
import { BsDot } from "react-icons/bs";

interface NavItemProps {
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  label?: string;
  alert?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  href,
  active,
  icon,
  label,
  onClick,
  alert,
}: NavItemProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
  }, [onClick]);

  return (
    <Link
      href={href || ""}
      onClick={handleClick}
      className={cn(
        "font-medium transition-colors hover:text-primary text-md flex items-center gap-3 md:gap-1 relative",
        active ? "text-[#2dac5c] dark:text-[#2dac5c]" : "text-muted-foreground"
      )}
    >
      {icon}
      {label}
      {alert ? (
        <BsDot
          className="absolute -top-8 left-[-0.65rem]"
          size={70}
          color="#2dac5c"
        />
      ) : null}
    </Link>
  );
};
