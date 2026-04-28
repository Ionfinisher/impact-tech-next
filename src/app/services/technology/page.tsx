"use client";

import Link from "next/link";
import Image from "next/image";
import { LaptopIcon } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function ServicesIndex() {
  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark min-h-screen"
        id="head"
      >
        <HeaderBlue activeLink="services" />

        <main className="pt-32 pb-20 container mx-auto px-4">
          <div className="flex items-center gap-6 my-8">
            <LaptopIcon size={40} weight="duotone" className="text-primary" />
            <h1 className="text-3xl font-bold">Service Technologie</h1>
          </div>

          <p className="text-gray-700 dark:text-white mb-6 max-w-3xl">
            Développement web & mobile, installations réseau, caméras de
            surveillance et maintenance. Solutions clé en main pour entreprises
            et clients particuliers.
          </p>

          <ul className="list-disc pl-5 mb-8 text-gray-700 dark:text-white max-w-2xl">
            <li>Sites web & applications mobiles</li>
            <li>Réseaux & sécurité</li>
            <li>Surveillance & maintenance</li>
            <li>Support & hébergement</li>
          </ul>

          <div className="mb-8">
            <Image
              src="/images/G.I.png"
              alt="Technologie"
              width={1200}
              height={600}
              className="rounded-lg shadow"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/services"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-900 dakr:text-white rounded"
            >
              Retour aux services
            </Link>
            <Link href="/" className="px-4 py-2 bg-primary text-white rounded">
              Accueil
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
