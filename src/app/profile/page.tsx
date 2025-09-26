"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function Profile() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) redirect("/login");

  return <div>perfill</div>;
}
