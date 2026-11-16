import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getDashboardPath } from "@/lib/utils";

/**
 * Role-based route protection middleware using NextAuth v5 auth wrapper.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const user = session?.user;

  // If not authenticated, redirect to login page with callbackUrl
  if (!user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = user.role;

  // /admin/* -> only SUPER_ADMIN
  if (pathname.startsWith("/admin")) {
    if (role !== "SUPER_ADMIN") {
      const redirectUrl = new URL(getDashboardPath(role), req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // /office/* -> SUPER_ADMIN or OFFICE_ADMIN
  if (pathname.startsWith("/office")) {
    if (role !== "SUPER_ADMIN" && role !== "OFFICE_ADMIN") {
      const redirectUrl = new URL(getDashboardPath(role), req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // /agent/* -> SUPER_ADMIN or OFFICE_ADMIN or AGENT or CALLING_STAFF
  if (pathname.startsWith("/agent")) {
    if (role !== "SUPER_ADMIN" && role !== "OFFICE_ADMIN" && role !== "AGENT" && role !== "CALLING_STAFF") {
      const redirectUrl = new URL(getDashboardPath(role), req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // /supplier/* -> SUPER_ADMIN or SUPPLIER roles
  if (pathname.startsWith("/supplier")) {
    const isSupplier = ["HOTEL_SUPPLIER", "BUS_OPERATOR", "CAB_BIKE_OPERATOR", "TRAVEL_SHOP_VENDOR", "SUPER_ADMIN"].includes(role);
    if (!isSupplier) {
      const redirectUrl = new URL(getDashboardPath(role), req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // /customer/* -> any authenticated user can access

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/office/:path*",
    "/agent/:path*",
    "/supplier/:path*",
    "/customer/:path*",
  ],
};
