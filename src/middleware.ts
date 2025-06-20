import { NextRequest, NextResponse } from "next/server";
import { MockUserData } from "@/mock/UserData";

const PUBLIC_PATH = ["/login", "/register"];
const PROTECTED_PATH = ["/protected"];

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;

  if (PUBLIC_PATH.includes(path) || path.startsWith("/api")) {
    return NextResponse.next();
  }

  const id = req.cookies.get("id")?.value;
  if (!id || !MockUserData.some((user) => user.id === id)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    PROTECTED_PATH.includes(path) &&
    (!id ||
      !MockUserData.some((user) => user.id === id && user.role === "admin"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|image).*)",
  ],
};
