import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Explicit array of open endpoints
const PUBLIC_ROUTES = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/refresh",
  "/api/v1/auth/send-otp",
  "/api/v1/auth/verify-otp",
  "/api/v1/auth/send-email",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authHeader = request.headers.get("Authorization");

  // 0. Negative Match: If the route is in the public array, skip token validation completely
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 1. Enforce Bearer token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or malformed token" },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Validate token validity and expiration
    const { payload } = await jwtVerify(token, SECRET);

    // 3. Clone headers to forward verified user info to the final endpoint
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-type", payload.userType as string);
    console.log("User ID:", payload.userId, "User Type:", payload.userType);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

// 4.Broadly match all api routes, filter logic handles the rest
export const config = {
  matcher: "/api/v1/:path*",
};
