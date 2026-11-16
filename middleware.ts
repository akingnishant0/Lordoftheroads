import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/utils";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  // Public paths: /login, /register, /, /api/auth, /api/public, /destinations, /hotels, /buses, /cabs
  // If not logged in and accessing protected dashboard routes, redirect to /login
  const isDashboardRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/office") ||
    pathname.startsWith("/agent") ||
    pathname.startsWith("/supplier") ||
    pathname.startsWith("/customer");

  if (isDashboardRoute && !user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!user) {
    return NextResponse.next();
  }

  const role = String(user.role || "");

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
    const isAllowed = ["SUPER_ADMIN", "OFFICE_ADMIN", "AGENT", "CALLING_STAFF"].includes(role);
    if (!isAllowed) {
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
