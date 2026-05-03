import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/finance", "/hostel"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("finhost_token")?.value;
  const path = req.nextUrl.pathname;

  if (protectedPaths.some((p) => path.startsWith(p)) && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/finance/:path*", "/hostel/:path*"],
};
