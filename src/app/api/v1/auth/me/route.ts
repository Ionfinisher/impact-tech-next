import { NextRequest, NextResponse } from "next/server";
import * as query from "@/db/queries";

export async function GET(request: NextRequest) {
  try {
    const idHeader = request.headers.get("x-user-id");
    const userTypeHeader = request.headers.get("x-user-type");
    if (!idHeader || !userTypeHeader) {
      return NextResponse.json(
        { error: "User ID ou type utilisateur manquant dans le header" },
        { status: 400 },
      );
    }

    const userId = Number(idHeader);
    const userType = userTypeHeader;

    // Fetch the user from the database based on the ID and user type
    const user = await query.UserQueries.getUserById(
      userId,
      userType as "provider" | "customer" | "admin",
    );

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 },
      );
    }

    // Exclude sensitive information like password before sending the response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur du serveur." }, { status: 500 });
  }
}
