import { NextResponse } from "next/server";
import * as query from "@/db/queries";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Convert your secret string to a Uint8Array
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, password, firstName, lastName, firebaseToken } = body;

    // Validate the phone number and password
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { error: "Numéro de téléphone et mot de passe requis!" },
        { status: 400 },
      );
    }

    // Check if the user already exists in the database
    const existingUser =
      await query.UserQueries.getCustomerByPhone(phoneNumber);
    if (existingUser) {
      return NextResponse.json(
        { error: "Numéro de téléphone déjà utilisé." },
        { status: 409 },
      );
    }

    // Create a new user in the database
    await query.UserQueries.createCustomer({
      phoneNumber: phoneNumber,
      password: bcrypt.hashSync(password, 10),
      firstName: firstName,
      lastName: lastName,
      firebaseToken: firebaseToken,
      userType: "customer",
    });

    // Fetch the user from the database based on the phone number
    const user = await query.UserQueries.getCustomerByPhone(phoneNumber);

    // Check if the user was successfully created
    if (!user) {
      return NextResponse.json(
        { error: "Erreur lors de la création du compte." },
        { status: 500 },
      );
    }

    const { id: userId, userType } = user;

    // Create the Access Token (expires in 15 minutes)
    const accessToken = await new SignJWT({
      userId: userId,
      userType: userType,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(SECRET);

    // Create a Refresh Token (expires in 90 days)
    const refreshToken = await new SignJWT({
      userId: userId,
      userType: userType,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("90d")
      .sign(SECRET);

    // Storing the refresh token in the database for the user
    await query.UserQueries.updateRefreshToken(userId, refreshToken);

    return NextResponse.json(
      { message: "Création de compte réussie.", accessToken, refreshToken },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur du serveur." }, { status: 500 });
  }
}
