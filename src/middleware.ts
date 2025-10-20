import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/api/me") ||
    pathname.startsWith("/api/checkout_sessions") ||
    pathname.startsWith("/api/order") ||
    pathname.startsWith("/api/addresses")
  ) {
    return await authMiddleware(req);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/api/me/:path*",
    "/api/checkout_sessions",
    "/api/order/:path*",
    "/api/addresses/:path*",
  ],
};
