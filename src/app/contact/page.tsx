"use client";

import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function Contact() {
  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <HeaderBlue activeLink="contact" />

      <main className="pt-32 pb-20">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
