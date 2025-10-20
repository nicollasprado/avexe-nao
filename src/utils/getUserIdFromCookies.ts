import "server-only";
import { jwtService } from "@/services/JwtService";
import { cookies } from "next/headers";

export const getUserIdFromCookies = async () => {
  const cookiesData = await cookies();

  const token = cookiesData.get("refreshToken")?.value;
  if (!token) return null;

  const payload = await jwtService.verifyToken(token);
  if (!payload) return null;

  return payload.userId;
};
