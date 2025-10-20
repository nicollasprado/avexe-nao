"use client";

import { usePath } from "@/contexts/PathContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface IReturnBtnProps {
  absolute?: boolean;
  bg?: boolean;
  size?: number;
}

export default function ReturnBtn({ absolute, bg, size }: IReturnBtnProps) {
  const { getLastPath } = usePath();
  const router = useRouter();

  const handleReturnBtnClick = () => {
    const pastPath = getLastPath();
    router.push(pastPath);
  };

  return (
    <button
      type="button"
      onClick={handleReturnBtnClick}
      className={`${absolute ? "absolute" : ""} top-5 left-5 ${
        bg ? "bg-white" : ""
      } p-2 rounded-full cursor-pointer`}
    >
      <ChevronLeft width={size || 32} height={size || 32} />
    </button>
  );
}
