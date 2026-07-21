import { NextResponse } from "next/server";
import * as query from "@/db/queries";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Convert your secret string to a Uint8Array
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, password } = body;

    // Validate the phone number and password
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { error: "Numéro de téléphone et mot de passe requis!" },
        { status: 400 },
      );
    }

    // 1. Fetch the user from the database based on the phone number
    const user = await query.UserQueries.getCustomerByPhone(phoneNumber);
    console.log("Fetched user:", user);

    if (user === null) {
      return NextResponse.json(
        { error: "Numéro ou mot de passe invalide." },
        { status: 401 },
      );
    }
    if (user.isActive === false) {
      return NextResponse.json(
        { error: "User account is inactive" },
        { status: 403 },
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Numéro ou mot de passe invalide." },
        { status: 401 },
      );
    }

    const { id: userId, userType } = user;

    // 2. Create the Access Token (expires in 15 minutes)
    const accessToken = await new SignJWT({ userId, userType })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(SECRET);

    // 3. Fetch the existing refresh token from the database
    const existingRefreshToken = user.refreshToken;

    let refreshToken: string;

    if (existingRefreshToken) {
      // If a refresh token already exists, use it
      refreshToken = existingRefreshToken;
    } else {
      // If no refresh token exists, create a new one (expires in 90 days)
      refreshToken = await new SignJWT({ userId, userType })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("90d")
        .sign(SECRET);

      // Store the new refresh token in the database
      await query.UserQueries.updateRefreshToken(userId, refreshToken);
    }

    // Update the last login timestamp for the user
    await query.UserQueries.updateLastLogin(userId);

    return NextResponse.json(
      { message: "Connexion réussie.", accessToken, refreshToken },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur du serveur." }, { status: 500 });
  }
}
