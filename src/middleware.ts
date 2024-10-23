import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES, ROOT, LOGIN } from "./lib/routes";

const authConfig = {
  session: {
    strategy: "jwt" as "jwt",
  },
  providers: [],
};

const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  // const { nextUrl } = req;
  // const session = await auth();
  // const isAuthenticated = !!session?.user;

  // const publicRoute =
  //   PUBLIC_ROUTES.some((p) => nextUrl.pathname.startsWith(p)) ||
  //   nextUrl.pathname === ROOT;

  // if (!isAuthenticated && !publicRoute) {
  //   return NextResponse.redirect(new URL(LOGIN, nextUrl));
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/api/:path*"],
// };

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
