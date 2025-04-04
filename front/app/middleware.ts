import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Só verifica se está acessando /realize-council
  if (url.pathname === "/realize-council") {
    try {
      const res = await fetch(
        "http://localhost:8081/council?isHappening=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      const hasActiveCouncil = data.content?.length > 0;

      if (!hasActiveCouncil) {
        // Bloqueia o acesso e redireciona para 404
        return NextResponse.redirect(
          new URL(`${sessionStorage.getItem("lastRoute")}`, request.url)
        );
      }
    } catch (err) {
      console.error("Erro ao verificar conselho:", err);
      return NextResponse.redirect(new URL(`${sessionStorage.getItem("lastRoute")}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/realize-council"],
};
