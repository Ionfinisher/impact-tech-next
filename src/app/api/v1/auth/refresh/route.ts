import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token requis" },
        { status: 401 },
      );
    }

    // Verify refresh token and extract payload
    const { payload } = await jwtVerify(refreshToken, SECRET);
    const userId = payload.userId as string;
    const userType = payload.userType as string;

    // Generate new tokens
    // Create the Access Token (expires in 15 minutes)
    const accessToken = await new SignJWT({ userId, userType })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(SECRET);

    return NextResponse.json(
      {
        message: "Refresh Token rafraîchis avec succès",
        accessToken,
        refreshToken,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Refresh token invalide ou expiré" },
      { status: 401 },
    );
  }
}
