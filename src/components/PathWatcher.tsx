"use client";

import { usePath } from "@/contexts/PathContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const PathWatcher = () => {
  const pathName = usePathname();
  const { pushPath, currentPath } = usePath();

  useEffect(() => {
    if (pathName && currentPath !== pathName) pushPath(pathName);
  }, [pathName]);

  return null;
};
