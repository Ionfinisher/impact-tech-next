import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, otpCode } = body;

    // Validate the otp code
    if (!otpCode) {
      return NextResponse.json({ error: "Code OTP requis!" }, { status: 400 });
    } else if (!phoneNumber) {
      return NextResponse.json(
        { error: "Numéro de téléphone requis!" },
        { status: 400 },
      );
    }

    // Look up for the OTP code
    // const otp =

    // Check fo otp code validity
    // if ()

    if (otpCode.length !== 6 && otpCode !== "123456") {
      return NextResponse.json(
        { error: "Code OTP invalide!" },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Code OTP valide." }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Erreur du serveur." }, { status: 500 });
  }
}
