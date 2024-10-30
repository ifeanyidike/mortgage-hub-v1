import { NextRequest, NextResponse } from "next/server";
import user from "@/server/user";

export async function POST(req: NextRequest) {
  //   const { refreshToken } = await req.json();
  const authHeader = (req.headers as any).authorization;
  console.log("req headers: ", req.headers);
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    return NextResponse.json({
      status: 400,
      error: "Refresh token is required",
    });
  }

  try {
    const token = user.refreshToken(refreshToken);
    return NextResponse.json({ status: 200, token });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({
      status: 403,
      error: "Invalid refresh token",
    });
  }
}
