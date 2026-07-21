import { NextResponse } from "next/server";
import * as query from "@/db/queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    // Validate the phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Numéro de téléphone requis!" },
        { status: 400 },
      );
    }

    // Check if the user already exists in the database
    const user = await query.UserQueries.getCustomerByPhone(phoneNumber);
    if (user) {
      return NextResponse.json(
        { error: "Numéro de téléphone déjà utilisé." },
        { status: 409 },
      );
    }

    // OTP generation and sending logic would go here (not implemented in this snippet)

    return NextResponse.json(
      { message: "Numéro de téléphone disponible pour l'inscription." },
      { status: 200 },
    );
  } catch (error) {
    console.error("OTP sending error:", error);
    return NextResponse.json({ error: "Erreur du serveur." }, { status: 500 });
  }
}
