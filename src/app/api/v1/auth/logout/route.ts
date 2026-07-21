import { NextResponse } from "next/server";
import * as query from "@/db/queries";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const idHeader = request.headers.get("x-user-id");
  const userTypeHeader = request.headers.get("x-user-type");
  if (!idHeader || !userTypeHeader) {
    return NextResponse.json(
      { error: "User ID ou type utilisateur manquant dans le header" },
      { status: 400 },
    );
  }
  const userId = Number(idHeader);

  // Invalidate the refresh token and access token
  await query.UserQueries.updateRefreshToken(userId, null);

  return NextResponse.json({ message: "Déconnexion réussie" }, { status: 200 });
}
