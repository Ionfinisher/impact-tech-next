import { render } from "@react-email/render";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Preview,
  Tailwind,
  Text,
} from "react-email";
import nodemailer from "nodemailer";

// Configure your email transporter
const smtpPort = Number(process.env.SMTP_PORT || "587");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
  },
});

interface EmailProps {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function EmailTemplate({
  fullname,
  email,
  phone,
  subject,
  message,
}: EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Contact - Un message vient d'être envoyé depuis la page de contact!
      </Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            <Text className="text-2xl font-bold text-black">Impact Tech</Text>

            <Heading className="text-2xl font-bold text-gray-900 mt-8">
              Sujet: {subject}!
            </Heading>

            <Text className="text-base text-gray-700 leading-6">
              {fullname} ({email}, {phone}) vous a envoyé le message suivant:
            </Text>
            <Text className="text-base text-gray-700 leading-6 mt-4">
              {message}
            </Text>

            <Text className="text-base text-gray-700 leading-6 mt-4">
              Vous pouvez répondre à ce message en utilisant l'adresse email de
              l'expéditeur dans votre messagerie avec l'email:
              contact@impacttechafrica.com.
            </Text>

            <Hr className="border-gray-200 my-8" />

            <Text className="text-sm text-gray-500">
              Impact Tech - Connecter les particuliers et les entreprises aux
              meilleurs prestataires dans les domaines du bâtiment, de
              l'architecture, de l'électricité et de la technologie.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { to, subject, fullname, email, phone, message } = body;

    if (!fullname || !email || !phone || !subject || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const htmlContent = await render(
      <EmailTemplate
        fullname={fullname}
        email={email}
        phone={phone}
        subject={subject}
        message={message}
      />,
    );

    await transporter.sendMail({
      from:
        process.env.FROM_EMAIL ||
        process.env.SMTP_FROM ||
        "noreply@impacttechafrica.com",
      to: to || "contact@impacttechafrica.com",
      subject: `Contact depuis le site web - ${subject}`,
      html: htmlContent,
      replyTo: email,
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email send error from the server:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
