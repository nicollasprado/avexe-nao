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
    switch (pathName) {
      case "/login": {
        if (isAuthenticated) redirect("/");
        return;
      }

      case "/register": {
        if (isAuthenticated) redirect("/");
        return;
      }

      case "/profile": {
        if (!isAuthenticated) redirect("/login");
      }

      case "/checkout": {
        if (!isAuthenticated) redirect("/login");
      }

      case "/checkout/details": {
        if (!isAuthenticated) redirect("/login");
      }
    }

    if (pathName && currentPath !== pathName) pushPath(pathName);
  }, [pathName, isAuthenticated]);

  return null;
};
