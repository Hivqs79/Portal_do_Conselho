import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Decryptor } from "./encryption/Decryptor";

export async function middleware(request: NextRequest) {
  const globalRoutes = [
    "/configurations",
    "/profile",
    "/chat",
    "/support",
    "/notifications",
    "/",
  ];
  const adminRoutes = ["/configurations"];
  const studentRoutes = [...globalRoutes];
  const leaderRoutes = [...globalRoutes, "/fill-out-pre-council"];
  const teacherRoutes = [...globalRoutes, "/annotations", "/council-historic"];
  const pedagogicRoutes = [
    ...globalRoutes,
    "/council-historic",
    "/council",
    "/realize-council",
    "/pre-council",
    "/release-feedback",
    "/class-management",
    "/user-management",
    "/dashboard",
    "/reports",
  ];
  const supervisiorRoutes = [...globalRoutes, "/council-historic"];

  const routePermissions: Record<string, string[]> = {
    admin: adminRoutes,
    student: studentRoutes,
    leader: leaderRoutes,
    teacher: teacherRoutes,
    pedagogic: pedagogicRoutes,
    subpedagogic: pedagogicRoutes,
    supervisior: supervisiorRoutes,
  };

  function isLikelyJwt(token: string): boolean {
    const parts = token.split(".");
    return parts.length === 3 && parts.every((part) => part.length > 0);
  }

  const url = request.nextUrl;
  const pathname = url.pathname;
  const encryptedToken = request.cookies.get("token")?.value;
  console.log("encryptedToken", encryptedToken);
  const authToken = Decryptor(encryptedToken ? encryptedToken : "");
  console.log("authToken", authToken);
  const isTokenPresent = authToken && isLikelyJwt(String(authToken));
  console.log("isTokenPresent", isTokenPresent);

  const checkRoutePermission = () => {
    try {
      const encryptedUser = request.cookies.get("user")?.value;

      if (!encryptedUser) return false;

      const decryptedUser = Decryptor(encryptedUser);
      const userRole = decryptedUser?.role;

      if (!userRole) return false;

      const allowedRoutes = routePermissions[userRole] || [];

      return (
        allowedRoutes.includes(pathname) ||
        allowedRoutes.some(
          (route) =>
            route.endsWith("/*") && pathname.startsWith(route.replace("/*", ""))
        )
      );
    } catch (error) {
      console.log("Error checking route permission:", error);
      return false;
    }
  };

  if (!isTokenPresent && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (isTokenPresent && pathname === "/login") ||
    pathname === "/password-recover" ||
    pathname === "/password-recover/code" ||
    pathname === "/password-recover/new-password"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !isTokenPresent &&
    pathname !== "/login" &&
    pathname !== "/password-recover" &&
    pathname !== "/password-recover/code" &&
    pathname !== "/password-recover/new-password"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isTokenPresent && !checkRoutePermission()) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/realize-council" || pathname === "/council") {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/council?isHappening=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      const hasActiveCouncil = data.content?.length > 0;

      if (pathname === "/realize-council" && !hasActiveCouncil) {
        const lastRoute = request.cookies.get("lastRoute")?.value || "/";
        return NextResponse.redirect(new URL(lastRoute, request.url));
      }

      if (pathname === "/council" && hasActiveCouncil) {
        return NextResponse.redirect(new URL("/realize-council", request.url));
      }
    } catch (err) {
      console.log("Erro ao verificar conselho:", err);
      const lastRoute = request.cookies.get("lastRoute")?.value || "/";
      return NextResponse.redirect(new URL(lastRoute, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/add-user",
    "/annotations",
    "/chat",
    "/class-management",
    "/configurations",
    "/council",
    "/council-historic",
    "/dashboard",
    "/fill-out-pre-council",
    "/login",
    "/password-recover",
    "/password-recover/code",
    "/password-recover/new-password",
    "/notifications",
    "/pre-council",
    "/profile",
    "/realize-council",
    "/release-feedback",
    "/reports",
    "/support",
    "/user-management",
  ],
};
