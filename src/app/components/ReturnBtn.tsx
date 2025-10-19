"use client";

import { usePath } from "@/contexts/PathContext";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface IReturnBtnProps {
  absolute?: boolean;
}

export default function ReturnBtn({ absolute }: IReturnBtnProps) {
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
      className={`${
        absolute ? "absolute" : ""
      } top-5 left-5 bg-white p-2 rounded-full cursor-pointer`}
    >
      <ChevronLeft width={32} height={32} />
    </button>
  );
}
