/**
 * Welcome Email Template
 *
 * A React Email template for welcoming new users.
 * Uses Tailwind CSS with pixel-based preset for email client compatibility.
 *
 * @see https://react.email/docs/introduction
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "react-email";

/**
 * Props for the Welcome Email
 */
interface WelcomeEmailProps {
  /** Sender's fullname */
  fullname: string;
  /** Sender's email */
  email: string;
  /** Sender's phone number */
  phone: string;
  /** Subject of the message */
  subject: string;
  /** The message content */
  message: string;
}

/**
 * Welcome Email Component
 *
 * Features:
 * - Responsive design with Container component
 * - Tailwind CSS for styling (pixel-based for email compatibility)
 * - Preview text for inbox snippets
 * - Clear call-to-action button
 */
export function EmailMessage({
  fullname,
  email,
  phone,
  subject,
  message,
}: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      {/* Preview text appears in email inbox list */}
      <Preview>
        Contact - Un message vient d'être envoyé depuis la page de contact!
      </Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-12 px-4 max-w-xl">
            {/* Logo/Brand area */}
            <Text className="text-2xl font-bold text-black">Impact Tech</Text>

            {/* Main heading */}
            <Heading className="text-2xl font-bold text-gray-900 mt-8">
              Sujet: {subject}!
            </Heading>

            {/* Body content */}
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

            {/* Footer */}
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

export default EmailMessage;
