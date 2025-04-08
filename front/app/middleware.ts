import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname === "/realize-council" || pathname === "/council") {
    try {
      const res = await fetch("http://localhost:8081/council?isHappening=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      const hasActiveCouncil = data.content?.length > 0;

      if (pathname === "/realize-council" && !hasActiveCouncil) {
        const lastRoute = request.cookies.get("lastRoute")?.value || "/";
        return NextResponse.redirect(new URL(lastRoute, request.url));
      }

      if (pathname === "/council" && hasActiveCouncil) {
        console.log(hasActiveCouncil);
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
  matcher: ["/realize-council", "/council"],
};