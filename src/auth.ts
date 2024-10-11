import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import userService from "./server/user";
import bcrypt from "bcryptjs";
import { ExistingUser } from "./types/db";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { Role } from "./types/general";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const email = credentials.email as string;
          const password = credentials.password as string;
          const existingUser = await userService.authenticate(email, password);
          return { id: existingUser.id, email: existingUser.email };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string);
        token.accessTokenExpires = decodedToken.exp! * 1000;
      }
      if (account && user) {
        const role = (cookies().get("role")?.value || "user") as
          | "user"
          | "broker";

        const expiresAt = new Date(
          Date.now() + (account.expires_at as number) * 1000
        );

        await userService.handleTokens(
          user.email as string,
          account.access_token as string,
          account.refresh_token as string,
          expiresAt,
          (account.provider || "credentials") as "google" | "credentials",
          role
        );
        if (account.provider === "google") return token;

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        return {
          ...token,
          user,
        };
      }

      const exp = token.accessTokenExpires as number;
      if (Date.now() < exp) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // If the user has not been verified yet, return null
      const newSession = { ...session } as {
        user: any;
      } & AdapterSession &
        Session & { accessToken: string; refreshToken: string };

      newSession.accessToken = token.access_token as string;
      newSession.refreshToken = token.refresh_token as string;
      newSession.user = token.user;

      return session;
    },
  },
});

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const tokens = await response.json();

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
