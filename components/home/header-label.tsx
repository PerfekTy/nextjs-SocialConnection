"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export const HeaderLabel: React.FC<HeaderProps> = ({
  label,
  showBackArrow,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="cursor-pointer hover:opacity-70
             transition"
          />
        )}
        <h1>{label}</h1>
      </div>
    </div>
  );
};
