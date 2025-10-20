"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePath } from "@/contexts/PathContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export const PathWatcher = () => {
  const pathName = usePathname();
  const { pushPath, currentPath } = usePath();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (pathName === "/register") {
      if (isAuthenticated) redirect("/");
    }

    if (pathName === "/login") {
      if (isAuthenticated) redirect("/");
    }

    if (pathName.includes("checkout")) {
      if (!isAuthenticated) redirect("/login");
    }

    if (pathName.includes("profile")) {
      if (!isAuthenticated) redirect("/login");
    }

    if (pathName && currentPath !== pathName) pushPath(pathName);
  }, [pathName, isAuthenticated]);

  return null;
};
